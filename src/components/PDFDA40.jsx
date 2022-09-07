import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import download from "downloadjs";
import da40 from "./PDFTemplates/DA-40.pdf";
import fuente from "./Fonts/Arial.ttf";
import { Chart } from "react-google-charts";
import {
  dataDA40,
  optionsDA40,
} from "./PDFTemplates/Graficas.js";

const PDFLIB = ({ inputData, modelData }) => {
  const bew = [modelData.peso, modelData.cg, modelData.momento];

  const fpax = [
    Number(inputData.p1) + Number(inputData.p2),
    modelData.fpax,
    modelData.fpax * (Number(inputData.p1) + Number(inputData.p2)),
  ];

  const rpax1 = [
    Number(inputData.rpax1),
    modelData.rpax1,
    modelData.rpax1 * Number(inputData.rpax1),
  ];

  const bag1 = [
    Number(inputData.bag1),
    modelData.bag1,
    modelData.bag1 * Number(inputData.bag1),
  ];

  const fob = [
    Number(inputData.fob) * 6/2.21,
    modelData.fob,
    Number(inputData.fob) * modelData.fob * 6/2.21,
  ];


  const toww = bew[0] + fpax[0] + rpax1[0] + 1.67 + fob[0] + bag1[0]
  const towm = bew[2] + fpax[2] + rpax1[2] + 1.67 + fob[2] + bag1[2]

  const tow = [toww, towm/toww, towm]

  dataDA40[dataDA40.length - 1][0] = tow[1];
  dataDA40[dataDA40.length - 1][2] = tow[0];
  
  function handleClick(e) {
    e.preventDefault();
    modifyPdf();
  }

  async function modifyPdf() {
    const existingPdfBytes = await fetch(da40).then((res) => res.arrayBuffer());

    const fontBytes = await fetch(fuente).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);
    const ubuntuFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    var variables = [
      [
        bew[0].toFixed(2).toString(),
        bew[1].toFixed(2).toString(),
        bew[2].toFixed(2).toString(),
      ],
      [
        fpax[0].toFixed(2).toString(),
        "2.3",
        fpax[2].toFixed(2).toString(),
      ],
      [
        rpax1[0].toFixed(2).toString(),
        "3.25",
        rpax1[2].toFixed(2).toString(),
      ],
      [(1.67).toFixed(2).toString(), "1.00", (1.67).toFixed(2).toString()],
      [
        (fob[0]).toFixed(2).toString(),
        "2.62",
        (fob[2]).toFixed(2).toString(),
      ],
      [
        bag1[0].toFixed(2).toString(),
        "3.64",
        bag1[2].toFixed(2).toString(),
      ],
    ];

    const ultfila = [
      tow[0].toFixed(2).toString(),
      (tow[2] / tow[0]).toFixed(2).toString(),
      tow[2].toFixed(2).toString(),
    ];

    const fontSize = 12;

    const textHeight = ubuntuFont.heightAtSize(fontSize);

    const esquina = [181.2, 567.95 + 0.5];
    const boxWidth = 116.8;
    const boxHeight = 25.9;
    const boxX = esquina[0];
    const boxY = esquina[1];

    var k = 0;
    while (k < 3) {
      firstPage.drawText(ultfila[k], {
        x:
          boxX +
          boxWidth / 2 -
          ubuntuFont.widthOfTextAtSize(ultfila[k], fontSize) / 2 +
          k * boxWidth,
        y: boxY + boxHeight / 2 - textHeight / 3 - 6 * boxHeight,
        font: ubuntuFont,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      k++;
    }

    var i = 0;
    while (i < 6) {
      var j = 0;
      while (j < 3) {
        firstPage.drawText(variables[i][j], {
          x:
            boxX +
            boxWidth / 2 -
            ubuntuFont.widthOfTextAtSize(variables[i][j], fontSize) / 2 +
            j * boxWidth,
          y: boxY + boxHeight / 2 - textHeight / 3 - i * boxHeight,
          font: ubuntuFont,
          size: fontSize,
          color: rgb(0, 0, 0),
        });

        j++;
      }
      i++;
    }

    firstPage.drawCircle({
      x:
        191.5 -
        100 +
        50 -
        0.5 +
        ((ultfila[1] - 2.4) * (259 + 5 + 1.5)) / (2.6 - 2.4),
      y:
        125.5 + 20 - 3 + ((ultfila[0] - 750) * (201.5 + 20 + 1)) / (1150 - 750),
      size: 3.5,
      color: rgb(1, 0, 0),
    });

    firstPage.drawText("T/O", {
      x:
        191.5 -
        100 +
        50 -
        0.5 +
        ((ultfila[1] - 2.4) * (259 + 5 + 1.5)) / (2.6 - 2.4) +
        10,
      y:
        125.5 +
        20 -
        3 +
        ((ultfila[0] - 750) * (201.5 + 20 + 1)) / (1150 - 750) -
        fontSize / 3,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(1, 0, 0),
    });

    firstPage.drawText("EC-" + modelData.matricula, {
      x: 100 - 20 - 20 - 5 - 10 + 2 + 1 + 1 + 3 - 2 - 1 + 0.5 - 0.1,
      y: 600 + 20 + 5 - 2,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    download(pdfBytes, "M&B DA-40.pdf", "application/pdf");
  }

  return (
    <div className="pdf">
      <Chart
        chartType="LineChart"
        width="550px"
        height="500px"
        data={dataDA40}
        options={optionsDA40}
      />
      <button onClick={handleClick}>Generar PDF</button>
    </div>
  );
};

export default PDFLIB;

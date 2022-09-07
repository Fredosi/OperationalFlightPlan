import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import download from "downloadjs";
import pa28r from './PDFTemplates/PA28R.pdf'
import fuente from './Fonts/Arial.ttf'
import { Chart } from "react-google-charts";
import {
  dataPA28,
  optionsPA28,
} from "./PDFTemplates/Graficas.js";

const PDFLIB = ({inputData, modelData}) => {

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
        Number(inputData.fob) * 6,
        modelData.fob,
        Number(inputData.fob) * modelData.fob * 6,
      ];

      const toww = bew[0] + (fpax[0] + rpax1[0])*2.21 + 15 + fob[0] + bag1[0]*2.21
      const towm = bew[2]*1000 + (fpax[2] + rpax1[2])*2.21 + 367.5 + fob[2] + bag1[2]*2.21 + 819

      const tow = [toww, towm/toww, towm]

      dataPA28[dataPA28.length - 1][0] = tow[1];
      dataPA28[dataPA28.length - 1][2] = tow[0];   

  function handleClick(e) {
    e.preventDefault();
    modifyPdf();
  }

  async function modifyPdf() {
  const existingPdfBytes = await fetch(pa28r).then((res) => res.arrayBuffer());
  
  const fontBytes = await fetch(fuente).then((res) => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit)
  const ubuntuFont = await pdfDoc.embedFont(fontBytes)

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  
  var variables = [
  [bew[0].toFixed(2).toString(),bew[1].toFixed(2).toString(), (bew[2]*1000).toFixed(2).toString()],
  [(fpax[0]*2.21).toFixed(2).toString(),'80.5',(fpax[2]*2.21).toFixed(2).toString()],
  [(rpax1[0]*2.21).toFixed(2).toString(),'118.1',(rpax1[2]*2.21).toFixed(2).toString()],
  [(15).toFixed(2).toString(),'24.5',(367.5).toFixed(2).toString()],
  [(fob[0]).toFixed(2).toString(),'95',(fob[2]).toFixed(2).toString()],
  [(bag1[0]*2.21).toFixed(2).toString(),'142.8',(bag1[2]*2.21).toFixed(2).toString()],
  ];

  const fontSize = 12;

  const textHeight = ubuntuFont.heightAtSize(fontSize);

  const esquina = [181.2,567.95]
  const boxWidth = 116.8;
  const boxHeight = 25.9;
  const boxX= esquina[0];
  const boxY = esquina[1];

  var i=0;
  while (i < 6) {
  var j=0;
  while (j < 3 ) {

    firstPage.drawText(variables[i][j], {
      x: boxX + boxWidth/2 - ubuntuFont.widthOfTextAtSize(variables[i][j], fontSize)/2 + j*boxWidth,
      y: boxY + boxHeight/2 - textHeight/3 - i*boxHeight,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

  j++;
  }
  i++;
  }

    firstPage.drawText("819", {
      x: 414.8 + boxWidth/2 - ubuntuFont.widthOfTextAtSize("819", fontSize)/2,
      y: 403.35 + boxHeight/2,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

  const toww = Number(variables[0][0]) + Number(variables[1][0]) + Number(variables[2][0]) + Number(variables[3][0]) + Number(variables[4][0]) + Number(variables[5][0]);
  const towm = Number(variables[0][2]) + Number(variables[1][2]) + Number(variables[2][2]) + Number(variables[3][2]) + Number(variables[4][2]) + Number(variables[5][2]);
  
  const ultfila = [toww,(towm+819)/toww,towm+819]

  var k=0;
  while (k < 3 ) {

    firstPage.drawText(ultfila[k].toFixed(2).toString(), {
      x: boxX + boxWidth/2 - ubuntuFont.widthOfTextAtSize(ultfila[k].toFixed(2).toString(), fontSize)/2 + k*boxWidth,
      y: 403.35 - 25.9 + boxHeight/2 - textHeight/3,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

  k++;
  }


    firstPage.drawCircle({
      x: 191.5 + ((ultfila[1]-78)*(259)/(94-78)),
      y: 125.5 + ((ultfila[0]-1400)*(201.5)/(3000-1400)),
      size: 3.5,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText("T/O", {
      x: 191.5 + ((ultfila[1]-78)*(259)/(94-78)) + 10,
      y: 125.5 + ((ultfila[0]-1400)*(201.5)/(3000-1400)) - fontSize/3,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(modelData.matricula, {
      x: 49 + ubuntuFont.widthOfTextAtSize("EC-", fontSize),
      y: 625+1,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    download(pdfBytes, "M&B PA28 ARROW.pdf", "application/pdf");
  }
  
  return (
    <div className="pdf">
      <Chart
        chartType="LineChart"
        width="600px"
        height="400px"
        data={dataPA28}
        options={optionsPA28}
      />
      <button onClick={handleClick}>Generar PDF</button>
    </div>
  );
};

export default PDFLIB;
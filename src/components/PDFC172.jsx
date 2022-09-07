import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import download from "downloadjs";
import pdfc172 from "./PDFTemplates/C172.pdf";
import fuente from "./Fonts/Calibri.ttf";
import React from "react";
import { Chart } from "react-google-charts";
import * as dfd from "danfojs";
import takeoffdata from "./PerformanceData/Cessna172/TODIST.json";
import landingdata from "./PerformanceData/Cessna172/LDGDIST.json";
import {
  dataC172,
  optionsC172,
} from "./PDFTemplates/Graficas.js";

const PDFC172 = ({ modelData, inputData }) => {
  const dftodata = new dfd.DataFrame(takeoffdata);
  const dfldgdata = new dfd.DataFrame(landingdata);

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

  const rpax2 = [
    Number(inputData.rpax2),
    modelData.rpax2,
    modelData.rpax2 * Number(inputData.rpax2),
  ];

  const bag1 = [
    Number(inputData.bag1),
    modelData.bag1,
    modelData.bag1 * Number(inputData.bag1),
  ];

  const bag2 = [
    Number(inputData.bag2),
    modelData.bag2,
    modelData.bag2 * Number(inputData.bag2),
  ];

  const bag3 = [
    Number(inputData.bag3),
    modelData.bag3,
    modelData.bag3 * Number(inputData.bag3),
  ];

  const bag4 = [
    Number(inputData.bag4),
    modelData.bag4,
    modelData.bag4 * Number(inputData.bag4),
  ];

  const fob = [
    Number(inputData.fob) * 6,
    modelData.fob,
    Number(inputData.fob) * modelData.fob * 6,
  ];

  const oilna = [
    Number(inputData.oilna),
    modelData.oilna,
    modelData.oilna * Number(inputData.oilna),
  ];

  const zfww = (fpax[0] + rpax1[0] + bag1[0] + bag2[0]) * 2.21;
  const zfwm = ((fpax[2] + rpax1[2] + bag1[2] + bag2[2]) * 2.21) / 1000;

  const zfw = [
    bew[0] + zfww,
    (1000 * (bew[2] + zfwm)) / (bew[0] + zfww),
    bew[2] + zfwm,
  ];

  const rw = [
    zfw[0] + fob[0],
    (1000 * (zfw[2] + fob[2] / 1000)) / (zfw[0] + fob[0]),
    zfw[2] + fob[2] / 1000,
  ];

  const tow = [
    rw[0] - 6.6,
    (1000 * (rw[2] - (6.6 * 48) / 1000)) / (rw[0] - 6.6),
    rw[2] - (6.6 * 48) / 1000,
  ];

  const tf = [
    Number(inputData.tf) * 6,
    modelData.fob,
    (modelData.fob * Number(inputData.tf) * 6) / 1000,
  ];

  const lw = [
    tow[0] - tf[0],
    (1000 * (tow[2] - tf[2])) / (tow[0] - tf[0]),
    tow[2] - tf[2],
  ];

  dataC172[dataC172.length - 2][0] = tow[1];
  dataC172[dataC172.length - 2][3] = tow[0];
  dataC172[dataC172.length - 1][0] = lw[1];
  dataC172[dataC172.length - 1][5] = lw[0];

  const TOPA =
    Number(inputData.DEPElev) + (1013 - Number(inputData.DEPQNH)) * 27;
  const LDGPA =
    Number(inputData.ARRElev) + (1013 - Number(inputData.ARRQNH)) * 27;
  const TOgr = dftodata.query(
    dftodata["GRDIST"]
      .eq("GR")
      .and(dftodata["WEIGHT"].gt(tow[0]))
      .and(dftodata["WEIGHT"].lt(tow[0] + 201))
      .and(dftodata["PA"].gt(TOPA))
      .and(dftodata["PA"].lt(TOPA + 1001))
      .and(dftodata["TEMP"].gt(Number(inputData.DEPTemp)))
      .and(dftodata["TEMP"].lt(Number(inputData.DEPTemp) + 11))
  );

  const TOdist = dftodata.query(
    dftodata["GRDIST"]
      .eq("DIST")
      .and(dftodata["WEIGHT"].gt(tow[0]))
      .and(dftodata["WEIGHT"].lt(tow[0] + 201))
      .and(dftodata["PA"].gt(TOPA))
      .and(dftodata["PA"].lt(TOPA + 1001))
      .and(dftodata["TEMP"].gt(Number(inputData.DEPTemp)))
      .and(dftodata["TEMP"].lt(Number(inputData.DEPTemp) + 11))
  );

  const LDGgr = dfldgdata.query(
    dfldgdata["GRDIST"]
      .eq("GR")
      .and(dfldgdata["PA"].gt(LDGPA))
      .and(dfldgdata["PA"].lt(LDGPA + 1001))
      .and(dfldgdata["TEMP"].gt(Number(inputData.ARRTemp)))
      .and(dfldgdata["TEMP"].lt(Number(inputData.ARRTemp) + 11))
  );

  const LDGdist = dfldgdata.query(
    dfldgdata["GRDIST"]
      .eq("DIST")
      .and(dfldgdata["PA"].gt(LDGPA))
      .and(dfldgdata["PA"].lt(LDGPA + 1001))
      .and(dfldgdata["TEMP"].gt(Number(inputData.ARRTemp)))
      .and(dfldgdata["TEMP"].lt(Number(inputData.ARRTemp) + 11))
  );

  const tableData = {
    bew: bew,
    fpax: fpax,
    rpax1: rpax1,
    rpax2: rpax2,
    bag1: bag1,
    bag2: bag2,
    bag3: bag3,
    bag4: bag4,
    fob: fob,
    oilna: oilna,
    zfwm: zfwm,
    zfww: zfww,
    zfw: zfw,
    rw: rw,
    lw: lw,
    tow: tow,
    tf: tf,
    TOgr: TOgr,
    LDGgr: LDGgr,
    TOdist: TOdist,
    LDGdist: LDGdist,
    TOPA: TOPA,
    LDGPA: LDGPA,
  };

  function handleClick(e) {
    e.preventDefault();
    modifyPdf();
  }

  async function modifyPdf() {
    const existingPdfBytes = await fetch(pdfc172).then((res) =>
      res.arrayBuffer()
    );

    const fontBytes = await fetch(fuente).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);
    const ubuntuFont = await pdfDoc.embedFont(fontBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    var variables = [
      [
        tableData.bew[0].toFixed(2).toString(),
        tableData.bew[1].toFixed(2).toString(),
        tableData.bew[2].toFixed(2).toString(),
      ],
      [
        (2.21 * tableData.fpax[0]).toFixed(2).toString(),
        "37.00",
        ((2.21 * tableData.fpax[2]) / 1000).toFixed(2).toString(),
      ],
      [
        (2.21 * tableData.rpax1[0]).toFixed(2).toString(),
        "73.00",
        ((2.21 * tableData.rpax1[2]) / 1000).toFixed(2).toString(),
      ],
      [
        (2.21 * tableData.bag1[0]).toFixed(2).toString(),
        "95.00",
        ((2.21 * tableData.bag1[2]) / 1000).toFixed(2).toString(),
      ],
      [
        (2.21 * tableData.bag2[0]).toFixed(2).toString(),
        "123.00",
        ((2.21 * tableData.bag2[2]) / 1000).toFixed(2).toString(),
      ],
      [
        tableData.zfw[0].toFixed(2).toString(),
        tableData.zfw[1].toFixed(2).toString(),
        tableData.zfw[2].toFixed(2).toString(),
      ],
      [
        tableData.fob[0].toFixed(2).toString(),
        "48.00",
        (tableData.fob[2] / 1000).toFixed(2).toString(),
      ],
      [
        tableData.rw[0].toFixed(2).toString(),
        tableData.rw[1].toFixed(2).toString(),
        tableData.rw[2].toFixed(2).toString(),
      ],
      ["6.6", "48.00", "0.32"],
      [
        tableData.tow[0].toFixed(2).toString(),
        tableData.tow[1].toFixed(2).toString(),
        tableData.tow[2].toFixed(2).toString(),
      ],
      [
        tableData.tf[0].toFixed(2).toString(),
        "48.00",
        tableData.tf[2].toFixed(2).toString(),
      ],
      [
        tableData.lw[0].toFixed(2).toString(),
        tableData.lw[1].toFixed(2).toString(),
        tableData.lw[2].toFixed(2).toString(),
      ],
    ];

    const fontSize = 10.5;

    const textHeight = ubuntuFont.heightAtSize(fontSize);
    const boxWidth2 = 70;
    const boxHeight2 = 17;

    var distancias = [
      [
        "TO: " + tableData.tow[1].toFixed(2),
        "LDG: " + tableData.lw[1].toFixed(2),
        " ",
      ],
      [" ", " ", inputData.DEPTemp + "ºC"],
      [tableData.TOgr.values[0][4], " ", tableData.TOdist.values[0][4]],
      [" ", " ", inputData.ARRTemp + "ºC"],
      [tableData.LDGgr.values[0][3], " ", tableData.LDGdist.values[0][3]],
    ];

    const esquina2 = [595.5, 89.7];

    var k = 0;
    while (k < 5) {
      var l = 0;
      while (l < 3) {
        firstPage.drawText(distancias[k][l].toString(), {
          x:
            esquina2[0] +
            boxWidth2 / 2 -
            ubuntuFont.widthOfTextAtSize(
              distancias[k][l].toString(),
              fontSize
            ) /
              2 +
            l * boxWidth2,
          y: esquina2[1] + boxHeight2 / 2 - textHeight / 3 - k * boxHeight2,
          font: ubuntuFont,
          size: fontSize,
          color: rgb(0, 0, 0),
        });

        l++;
      }
      k++;
    }

    firstPage.drawText("C-" + modelData.modelo, {
      x: 290,
      y: 431.5,
      font: ubuntuFont,
      size: 10.5,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText("EC-" + modelData.matricula, {
      x: 133,
      y: 431.5,
      font: ubuntuFont,
      size: 10.5,
      color: rgb(0, 0, 0),
    });

    const esquina = [99, 300 - 228.6 + 150 + 2];

    firstPage.drawCircle({
      x: esquina[0] + ((tableData.tow[1] - 34) * 319.3) / 14,
      y: esquina[1] + ((tableData.tow[0] - 1500) * 172.3) / 900,
      size: 3.5,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText("T/O", {
      x: esquina[0] + ((tableData.tow[1] - 34) * 319.3) / 14 + 10,
      y: esquina[1] + ((tableData.tow[0] - 1500) * 172.3) / 900 - fontSize / 3,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    firstPage.drawCircle({
      x: esquina[0] + ((tableData.lw[1] - 34) * 319.3) / 14,
      y: esquina[1] + ((tableData.lw[0] - 1500) * 172.3) / 900,
      size: 3.5,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText("LDG", {
      x: esquina[0] + ((tableData.lw[1] - 34) * 319.3) / 14 - 25,
      y: esquina[1] + ((tableData.lw[0] - 1500) * 172.3) / 900 - fontSize / 3,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const boxWidth = 69.5;
    const boxHeight = 21;
    const boxX = 596.5;
    const boxY = 387.5;

    firstPage.drawText(inputData.fob.toString(), {
      x:
        boxX +
        boxWidth / 2 -
        ubuntuFont.widthOfTextAtSize(inputData.fob.toString(), fontSize) / 2 -
        boxWidth,
      y: boxY + boxHeight / 2 - textHeight / 3 - 6 * boxHeight,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(inputData.tf.toString(), {
      x:
        boxX +
        boxWidth / 2 -
        ubuntuFont.widthOfTextAtSize(inputData.tf.toString(), fontSize) / 2 -
        boxWidth,
      y: boxY + boxHeight / 2 - textHeight / 3 - 10 * boxHeight,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    var i = 0;
    while (i < 12) {
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

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    download(pdfBytes, "M&B C172.pdf", "application/pdf");
  }

  return (
    <div className="pdf">
      <Chart
        chartType="LineChart"
        width="600px"
        height="400px"
        data={dataC172}
        options={optionsC172}
      />
      <button onClick={handleClick}>Generar PDF</button>
    </div>
  );
};

export default PDFC172;

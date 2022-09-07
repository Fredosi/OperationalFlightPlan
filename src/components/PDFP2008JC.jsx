import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit'
import download from "downloadjs";
import p2008jc from './PDFTemplates/P2008JC.pdf'
import fuente from './Fonts/Arial.ttf'

const PDFP2008JC = ({inputData, modelData}) => {

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
    };

  function handleClick(e) {
    e.preventDefault();
    modifyPdf();
  }

  async function modifyPdf() {
  const existingPdfBytes = await fetch(p2008jc).then((res) => res.arrayBuffer());
  
  const fontBytes = await fetch(fuente).then((res) => res.arrayBuffer())

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  pdfDoc.registerFontkit(fontkit)
  const ubuntuFont = await pdfDoc.embedFont(fontBytes)

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  
  var variables = [
  [tableData.bew[0].toFixed(3).toString(),tableData.bew[1].toFixed(3).toString(), tableData.bew[2].toFixed(3).toString()],
  [(tableData.fob[0]/2.21).toFixed(3).toString(),'2.209',((tableData.fob[2]/2.21)).toFixed(3).toString()],
  [(tableData.fpax[0]).toFixed(3).toString(),'1.800',(tableData.fpax[2]).toFixed(3).toString()],
  [(tableData.bag1[0]).toFixed(3).toString(),'2.417',(tableData.bag1[2]).toFixed(3).toString()],
  ];

  const fontSize = 12;

  const textHeight = ubuntuFont.heightAtSize(fontSize);

  const esquina = [235.3,348.65]

  const toww = (tableData.bew[0]+(tableData.fob[0]/2.21)+tableData.bag1[0]+tableData.fpax[0])
  const towm = (tableData.bew[2]+(tableData.fob[2]/2.21)+tableData.bag1[2]+tableData.fpax[2])

  const towtecnam = [(toww).toFixed(3).toString(),
  (towm/toww).toFixed(3).toString(),
  (towm).toFixed(3).toString()]

  const towtecnamD = [(toww).toFixed(3).toString(),
    ((towm/toww)+1.566).toFixed(3).toString(),
    (towm).toFixed(3).toString()]

  firstPage.drawText((towm).toFixed(3).toString(), {
    x: 235.3+ (104*2) + 104/2 - (ubuntuFont.widthOfTextAtSize((towm).toFixed(3).toString(), fontSize))/2 ,
    y: 348.65 - (22.2*6)+11.1-3 + 22.2*2.6/2 - textHeight/3,
    font: ubuntuFont,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const boxWidth2 = 104;
  const boxHeight2 = 22.2;
  const boxX2 = 235.3;
  const boxY2 = 348.65-22.2*7+5+2+1;

  var k=0;
  while (k < 3 ) {
  
    firstPage.drawText(towtecnam[k], {
      x: boxX2 + boxWidth2/2 - ubuntuFont.widthOfTextAtSize(towtecnam[k], fontSize)/2 + k*boxWidth2,
      y: boxY2 + boxHeight2/2 - textHeight/3,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(towtecnamD[k], {
      x: boxX2 + boxWidth2/2 - ubuntuFont.widthOfTextAtSize(towtecnamD[k], fontSize)/2 + k*boxWidth2,
      y: boxY2 + boxHeight2/2 - textHeight/3 - 30,
      font: ubuntuFont,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

  k++;
  }

  const boxWidth = 104;
  const boxHeight = 22.2;
  const boxX = esquina[0];
  const boxY = esquina[1];

  var i=0;
  while (i < 4) {
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

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    download(pdfBytes, "M&B P2008JC.pdf", "application/pdf");
  }
  
  return (
    <div>
      <button onClick={handleClick}>Generar PDF</button>
    </div>
  );
};

export default PDFP2008JC;
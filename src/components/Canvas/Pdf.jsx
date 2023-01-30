import {jsPDF} from "jspdf";


function ExportPDF (stage){
    const doc = new jsPDF('l', 'px', [window.innerWidth, window.innerHeight]);
    doc.setTextColor('#000000');
    doc.addImage(
        stage,
        "SVG",
        10,
        10,
        window.innerWidth-20, 
        window.innerHeight-20
      );
    doc.save("a4.pdf");
}

export default ExportPDF;
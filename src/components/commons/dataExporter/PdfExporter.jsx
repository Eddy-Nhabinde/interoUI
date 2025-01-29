import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "shards-react";
import React from "react";

const exportPDF = (body, tableColumns, title, fileName) => {

  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "landscape"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  const status = {
    "#63D471": "SUCESSO",
    "#F44E3F": "ERRO",
    "#BACDB0": "---"
  }
  doc.setFontSize(15);

  const headers = [tableColumns()];

  const data = body();
  let updatedData = data.map((row) => {
    return row.map((dado) => {
      if (typeof dado != 'string') {
        return status[dado.icon.props.style.color]
      } else return dado
    })
  })

  let content = {
    startY: 50,
    head: headers,
    body: updatedData
  };

  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(fileName)
}

const PdfExporter = ({ tableData, tableColumns, fileName, fileTitle }) => {

  return (
    <Button theme="danger" className="pi pi-file-pdf" onClick={() => exportPDF(tableData, tableColumns, fileTitle, `Tabela ${fileName}`)}>
    </Button>
  )
}


export { PdfExporter }
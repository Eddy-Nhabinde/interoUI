import React from 'react'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'

const ExcelExporter = ({ fileName }) => {

    return (
        <ReactHtmlTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button pi pi-file-excel  btn btn-success"
            table="table-to-xls-export"
            filename={`Tabela ${fileName}-${(new Date().toISOString())}`}
            sheet="tablexls"
            buttonText="" />
    )
}

export { ExcelExporter }
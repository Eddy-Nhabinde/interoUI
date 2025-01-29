import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'shards-react'
import { ExcelExporter } from './ExcelExporter'
import { PdfExporter } from './PdfExporter'
import '../../../assets/styles/table.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

const TableDataExporter = ({ tableData, tableColumns, fileName, fileTitle, isFetching }) => {
    const { t } = useTranslation();

    const [openDorpDown, setOpenDropDown] = useState(false);

    const onChangeDropDown = () => {
        setOpenDropDown(!openDorpDown)
    }

    return (
        <Dropdown open={openDorpDown} toggle={onChangeDropDown} className='file_expoter-dropdown d-flex align-items-center'>
            <DropdownToggle size="sm" className="btn btn-outline-primary mb-sm-0 mr-1">{t("expr-table")}</DropdownToggle>
            {isFetching ? 
                <DropdownMenu className='dropdown-menu__table-exporter' right>
                    <DropdownItem>
                        <Tooltip>
                            <div className="text-center">
                                A carregar...
                            </div>
                        </Tooltip>
                    </DropdownItem>
                </DropdownMenu>
            :
                <DropdownMenu className='dropdown-menu__table-exporter' right>
                    <DropdownItem>
                        <Tooltip title="Exportar para excel">
                            <div className="dropdown-sublist">
                                <ExcelExporter fileName={fileName} />
                            </div>
                        </Tooltip>
                    </DropdownItem>
                    <DropdownItem>
                        <Tooltip title="Exportar para pdf">
                            <div className="dropdown-sublist ">
                                <PdfExporter fileTitle={fileTitle} fileName={fileName} tableColumns={tableColumns} tableData={tableData} />
                            </div>
                        </Tooltip>
                    </DropdownItem>
                </DropdownMenu>
            }
            

            
            
          
        </Dropdown>
    )
}

export { TableDataExporter }
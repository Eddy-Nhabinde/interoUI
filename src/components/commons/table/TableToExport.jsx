import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/table.css';
import { ModalDialog } from '../modal/Modal';

const TableToExport = ({ isFetching, tableColumns, tableData, isRowClickable, allData, isRowHover, fetching = false, }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [rowIndex, setRowIndex] = useState(null)

  const toggleModal = (clickedRow) => {
    setOpenModal(!openModal)
    setRowIndex(clickedRow);
  }

  return (
    <table id='table-to-xls-export' className="table mb-0" >
      <thead className="bg-light">
        <tr>
          {
            tableColumns().map((column, index) => (
              <th style={{ whiteSpace: "nowrap" }} scope="col" className="border-0">
                {t(column)}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody className="w-100">
        {isFetching === false &&
          (tableData().length === 0 ? (
            <tr>
              <td colspan={tableColumns().length} className='text-center'>
                <h4>Não foram encontrados dados</h4>
              </td>
            </tr>
          ) : (
            tableData().map((row, index) => (
              <tr {...(isRowClickable && { onClick: () => toggleModal(index) })} key={index} className={(row[4] === '---' && 'fill__tableRow')}>
                {
                  row.map((cellData, idx) => (
                    <td className={`${isRowHover}-${idx}`} style={{ maxWidth: "200px" }} data-label={tableColumns()[idx]}>
                      {cellData}
                      {isRowHover &&
                        <>
                          <div className='show-period_details'>
                            <span>{t("periodos")}</span>
                            <div className='mt-2'>
                              <span>
                                {JSON.parse(allData[index].details).periods}
                              </span>
                            </div>
                          </div>
                        </>
                      }
                    </td>
                  ))
                }
                {
                  openModal && <ModalDialog data={allData[rowIndex]} open={openModal} setOpen={toggleModal} />
                }
              </tr>
            ))
          ))}
      </tbody>
    </table>
  )
}

export default TableToExport
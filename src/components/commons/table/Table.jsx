import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../assets/styles/table.css';
import { ModalDialog } from '../modal/Modal';
import { useEffect } from 'react';

const Table = ({ syncId, isFetching, tableColumns, tableData, isRowClickable, allData, isRowHover, fetching = false, component = 'Default', paintRow = false }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [rowIndex, setRowIndex] = useState(null)

  const toggleModal = (clickedRow) => {
    setOpenModal(!openModal)
    setRowIndex(clickedRow);
  }

  useEffect(() => {
    if (syncId) setOpenModal(!openModal)
  }, [syncId])

  const getServerList = () => {
    if (tableColumns()) return tableColumns().slice(4)
    else return []
  }

  function setColor(cellData) {
    if (paintRow) {
      if (cellData == 'ERROR')
        return "#ED474A"
      if (cellData == 'SUCCESS')
        return "#61D095"
    }
  }

  return (
    <table id='table-to-xls' className="table   mb-0">
      <thead className="bg-light">
        <tr>
          {
            tableColumns().map((column) => (
              <th style={{ whiteSpace: "nowrap" }} scope="col" className="border-0">
                {t(column)}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody className="w-100">
        {(isFetching === false && fetching === false) &&
          (tableData().length === 0 ? (
            <tr>
              <td colspan={tableColumns().length} className='text-center'>
                <h4>Não foram encontrados dados</h4>
              </td>
            </tr>
          ) : (
            tableData().map((row, index) => {
              return (
                <tr style={{ backgroundColor: setColor(row[row.length - 1], index), cursor: "pointer" }} {...(isRowClickable && { onClick: () => toggleModal(index) })} key={index} className={(row[4] === '---' && 'fill__tableRow')}>
                  {
                    row.map((cellData, idx) => {
                      let icon = null
                      let event = null

                      if (typeof cellData != 'string') {
                        if (cellData.icon == undefined) {
                          icon = 0
                        } else {
                          icon = cellData.icon
                          event = cellData.event
                        }
                      }

                      return (
                        <td onClick={event ? event : () => { }} className={`${isRowHover}-${idx}`} style={{ maxWidth: "200px" }} data-label={tableColumns()[idx]}>
                          {cellData ? icon != null ? icon : cellData : 0}
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
                      )
                    })
                  }
                  {openModal && <ModalDialog id={syncId} component={component} data={allData[rowIndex]} open={openModal} setOpen={toggleModal} serverList={getServerList()} />}
                </tr>
              )
            })
          ))}
      </tbody>
    </table >
  )
}

export default Table
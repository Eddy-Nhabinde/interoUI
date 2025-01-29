import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormSelect, } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { onDataParamsChange, onParamChange } from "../../../../utils/services/onParamsChange";
import { useHistory, useLocation } from 'react-router-dom'
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { ErrorPage } from "../../../../pages/error";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import { GetUrlParams } from "../../../../utils/commons/getUrlParams";
import { useTranslation } from "react-i18next";
import { onDateChange } from "../../../../utils/commons/onDateChange";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import TableToExport from "../../../../components/commons/table/TableToExport";

const SimmLineList = () => {
  const history = useHistory()
  const { endDate, startDate, params } = GetUrlParams()
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState(params.get("status") || '');
  const [inicio, setInicio] = useState(startDate);
  const [fim, setFim] = useState(endDate);
  const [sDate, setSDate] = useState(startDate);
  const [eDate, setEDate] = useState(endDate);
  const statusArray = ['Criados', 'Actualizados', 'Ignorados', 'Apagados'];
  const { t } = useTranslation();
  const { UpdateDateValues } = onDateChange({ setSDate, setEDate, startDate: inicio, endDate: fim, history })

  const clearParams = () => {
    setSDate(undefined);
    setEDate(undefined);
    onDataParamsChange(history, 'startDate', 'endDate')
  };

  const getParams = () => {
    if (sDate && eDate) {
      return `&startDate=${formaterToIsoDate(new Date(sDate))}"&endDate=${formaterToIsoDate(new Date(eDate))}`
    }
    return ''
  }

  const { data, error, isFetching } = useFetch(`api/siim/imports?page=${currentPage, getParams()}`);

  if (error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['Data e hora', 'Criados', 'Actualizados', 'Ignorados', 'Apagados', 'Estado'];
  }

  const tableData = () => {
    const events = [];
    if (isFetching === false) {
      for (const event of data.data) {
        let data = JSON.parse(event.importHistorySummary)
        events.push([event.importDate, data.importCount.imported, data.importCount.updated, data.importCount.ignored, data.importCount.deleted, data.status])
      }
    }
    return events
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Card small className="h-100 mb-4 mt-4">
        <CardBody className=" py-0 ">
          <Row className="mb-4">
            <Col sm="6" className="d-flex mb-2 mb-sm-0 mt-4">
              <RangeDatePicker
                startDate={inicio}
                setStartDate={setInicio}
                endDate={fim}
                setEndDate={setFim}
              />
            </Col>
            <Col sm="6" className="text-right">
              <Button
                size="sm"
                className="btn btn-outline-primary mb-2 mb-sm-0 mt-4 mr-1"
                onClick={() => UpdateDateValues()}
              >
                {t("atualizar_dados")}
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </Button>
              <Button
                size="sm"
                className="btn btn-outline-primary mb-2 mb-sm-0 mt-4"
                onClick={() => clearParams()}
              >
                {t("limpar_dados")}
                <i class="fa fa-refresh" aria-hidden="true"></i>
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0 mb-2">Tickets by status</h6>
              <Row className='w-100'>
                <Col>
                  <FormSelect
                    className="col-lg-3 mr-1"
                    id="project"
                    value={status}
                    onChange={(event) => onParamChange(event, setStatus, history, 'status')}
                  >
                    <option value='todos'>Filtrar pelo estado</option>
                    {statusArray.map((statu, index) => (
                      <option value={statu}>{statu}</option>
                    ))}
                  </FormSelect>
                </Col>
                {data && <TableDataExporter fileName='lista de historico-SIIM' fileTitle='SIIM-Lista de Histórico' tableData={tableData} tableColums={tableColums} />}
              </Row>
              <Row />
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <TableToExport isFetching={isFetching} error={error} tableColumns={tableColums} tableData={tableData} />
            </CardBody>
            {isFetching === false && <TablePaginationDemo totalPages={data} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SimmLineList;

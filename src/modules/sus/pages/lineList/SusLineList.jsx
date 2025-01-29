import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import { useHistory, useLocation } from 'react-router-dom'
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { onDataParamsChange } from "../../../../utils/services/onParamsChange";
import { ErrorPage } from "../../../../pages/error";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import { onDateChange } from "../../../../utils/commons/onDateChange";
import TableToExport from "../../../../components/commons/table/TableToExport";

const SIRCEVLineList = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { t } = useTranslation();
  const history = useHistory()

  const getUrlParams = () => {
    return {
      startDate: params.get('startDate') ? new Date(params.get('startDate')) : undefined,
      endDate: params.get('endDate') ? new Date(params.get('endDate')) : undefined
    }
  }

  const [startDate, setStartDate] = useState(getUrlParams().startDate);
  const [endDate, setEndDate] = useState(getUrlParams().endDate);
  const [sDate, setSDate] = useState(getUrlParams().startDate);
  const [eDate, setEDate] = useState(getUrlParams().endDate);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState(params.get("status") || '');
  const { UpdateDateValues } = onDateChange({ setSDate, setEDate, endDate, startDate, history })

  const getStatusIdParams = () => {
    if (status && status !== "todos") return `&status=${status}`;
    return "";
  };

  const clearParams = () => {
    setStartDate(undefined);
    setEndDate(undefined);
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

  const { data, error, isFetching } = useFetch(`api/mfl/syncs?aggregate=true&page=${currentPage + 1}&pageSize=${rowsPerPage}${getParams()}${getStatusIdParams()}`);

  if (error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['Data', 'Created', 'Updated', 'Deleted', 'Status'];
  }

  const tableData = () => {
    const events = [];
    if (isFetching === false) {
      for (const event of data.data) {
        events.push([event.date, event.created, event.updated, event.deleted, event.ignored > 0 ? 'Error' : 'Success'])
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
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
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
              <Row className='w-100'>
                <Col>
                  <h6 className="m-0 mb-2">Histórico</h6>
                </Col>
                {data && <TableDataExporter fileName='lista de historico-SIRCEV' fileTitle='SIRCEV-Lista de Histórico' tableData={tableData} tableColumns={tableColums} />}
              </Row>
              <Row />
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <TableToExport fetching={false} isFetching={isFetching} error={error} tableColumns={tableColums} tableData={tableData} />
            </CardBody>
            {isFetching === false && <TablePaginationDemo totalPages={data} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SIRCEVLineList;

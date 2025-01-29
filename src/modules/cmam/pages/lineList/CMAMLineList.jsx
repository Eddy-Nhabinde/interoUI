import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormSelect } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import { useHistory, useLocation } from 'react-router-dom'
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { onDataParamsChange, onParamChange } from "../../../../utils/services/onParamsChange";
import { ErrorPage } from "../../../../pages/error";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import TableToExport from "../../../../components/commons/table/TableToExport";

const CMAMLineList = () => {
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


  const statusArray = ['SUCCESS', 'ERROR', 'WARNING'];

  const getStatusIdParams = () => {
    if (status && status !== "todos") return `&status=${status}`;
    return "";
  };

  const onDateChange = () => {
    if (endDate) {
      setSDate(formaterToIsoDate(new Date(startDate)));
      setEDate(formaterToIsoDate(new Date(endDate)));
      const url = new URL(window.location.href);
      url.searchParams.set("startDate", formaterToIsoDate(new Date(startDate)));
      url.searchParams.set("endDate", formaterToIsoDate(new Date(endDate)));
      history.push(url.search)
    } else alert("You need endDate");
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

  const { data, error, isFetching } = useFetch(`/api/cmam/monitoring/imports?page=${currentPage + 1}&pageSize=${rowsPerPage}${getParams()}${getStatusIdParams()}`);
  const { data: dataToExport, error: errorExport, isFetching: isFetchingExport  } = useFetch(`/api/cmam/monitoring/imports?paging=${false}${getParams()}${getStatusIdParams()}`);

  if (error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['data-hora', 'us', 'produtos', 'periodos', 'estado'];
  }
  const tableColumExport = () => {
    return ['Data e hora', 'Unidades Sanitárias', 'Produtos', 'Períodos', 'Estado'];
  }
  const periodsCounter = (periodString) => {
    return periodString.split(";").length
  }

  const tableData = () => {
    const imports = [];
    if (isFetching === false) {
      for (const imprt of data.data) {
        const details = JSON.parse(imprt.details)
        imports.push([imprt.created_at, details.numOrgUnits, details.numVariables,periodsCounter(details.periods), imprt.status])
      }
    }
    return imports
  }

  const tableDataExport = () => {
    const imports = [];
    if(dataToExport){
      for (const imprt of dataToExport.data) {
        const details = JSON.parse(imprt.details)
        imports.push([imprt.created_at, details.numOrgUnits, details.numVariables,periodsCounter(details.periods), imprt.status])
      }
    }
    return imports
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
                onClick={() => onDateChange()}
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
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">{t("historico-import")}</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className='pl-0'>
                  <FormSelect
                    className="col-lg-3 mr-1"
                    id="project"
                    value={status}
                    onChange={(event) => onParamChange(event, setStatus, history, 'status')}
                  >
                    <option value='todos'>{t("filtrar-estado")}</option>
                    {statusArray.map((statu, index) => (
                      <option value={statu}>{statu}</option>
                    ))}
                  </FormSelect>
                </Col>
                {data && <TableDataExporter fileName='lista de historico-CMAM' fileTitle='CMAM-Histórico de Importações' tableColums={tableColumExport} tableData={tableDataExport} isFetching={isFetchingExport} />}
              </Row>
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <Table  isRowHover={true} allData={data && data.data} isRowClickable={true} isFetching={isFetching} error={error} tableColumns={tableColums} tableData={tableData} />
              <div className="d-none">
                <TableToExport isFetching={isFetching} error={error} tableColumns={tableColumExport} tableData={tableDataExport} />
              </div>
            </CardBody>
            {isFetching === false && <TablePaginationDemo totalPages={data} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CMAMLineList;

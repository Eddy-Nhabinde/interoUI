import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormSelect, } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { onParamChange } from "../../../../utils/services/onParamsChange";
import { useHistory } from 'react-router-dom'
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { ErrorPage } from "../../../../pages/error";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import Filter from "../../components/filter/filter";
import { GetUrlParams } from "../../../../utils/commons/getUrlParams";
import TableToExport from "../../../../components/commons/table/TableToExport";

const SIRCEVLineList = () => {
  const history = useHistory()
  const { endDate, startDate, params } = GetUrlParams()
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [status, setStatus] = useState(params.get("status") || '');
  const [sDate, setSDate] = useState(startDate);
  const [eDate, setEDate] = useState(endDate);
  const [selectedOu, setSelectedOu] = useState({ label: "Moçambique", id: null });
  const statusArray = ['Consultado', 'Usado'];

  const getStatusIdParams = () => {
    if (status && status !== "todos") return `&status=${status}`;
    return "";
  };

  const getParams = () => {
    if (sDate && eDate) {
      return `&startDate=${formaterToIsoDate(new Date(sDate))}&endDate=${formaterToIsoDate(new Date(eDate))}`
    }
    return ''
  }

  const { data, error, isFetching } = useFetch(`api/monitoring/srcev/events?orgUnit=${selectedOu.id ? selectedOu.id : "LJX5GuypkKy"}&page=${currentPage + 1}&pageSize=${rowsPerPage}${getParams()}${getStatusIdParams()}`);

  if (error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['Event Date', 'OU Name', 'Status', 'Status Date'];
  }

  const tableData = () => {
    const events = [];
    if (isFetching === false) {
      for (const event of data.data) {
        events.push([event.eventDate, event.orgUnitName, event.status === "" ? "---" : event.status, event.statusDate === "" ? "---" : event.statusDate])
      }
    }
    return events
  }

  return (
    <Container fluid className="main-content-container px-4">
      <div style={{ paddingTop: "20px" }} >
        <Filter selected={"LJX5GuypkKy"} selectedOu={selectedOu} setSelectedOu={setSelectedOu} setEDate={setEDate} setSDate={setSDate} sDate={sDate} eDate={eDate} />
      </div>
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

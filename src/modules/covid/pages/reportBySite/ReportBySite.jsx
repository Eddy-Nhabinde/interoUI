import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormSelect, } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { useHistory,useLocation } from "react-router-dom";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import ChartComponent from "../../../../components/commons/chart/Chart";
import { ClickableAndDeletableChips } from "../../../../components/commons/chip/Chip";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { ErrorPage } from "../../../../pages/error";
import { onDataParamsChange, onParamChange } from "../../../../utils/services/onParamsChange";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";

const ReportBySite = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { t } = useTranslation();
  const history = useHistory();

  const getUrlParams = () => {
    return {
      startDate: params.get("startDate") ? new Date(params.get("startDate")) : '',
      endDate: params.get("endDate") ? new Date(params.get("endDate")) : '',
    };
  };

  const [startDate, setStartDate] = useState(getUrlParams().startDate);
  const [endDate, setEndDate] = useState(getUrlParams().endDate);
  const [sDate, setSDate] = useState(getUrlParams().startDate);
  const [eDate, setEDate] = useState(getUrlParams().endDate);
  const [siteId, setSiteId] = useState(params.get("location") || '');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const onDateChange = () => {
    if (endDate) {
      setSDate(formaterToIsoDate(new Date(startDate)));
      setEDate(formaterToIsoDate(new Date(endDate)));
      const url = new URL(window.location.href);
      url.searchParams.set("startDate", formaterToIsoDate(new Date(startDate)));
      url.searchParams.set("endDate", formaterToIsoDate(new Date(endDate)));
      history.push(url.search);
    } else alert("You need endDate");
  };

  const clearParams = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSDate(undefined);
    setEDate(undefined);
    onDataParamsChange(history,'startDate','endDate')
  };

  const getParams = () => {
    if (sDate && eDate) {
      return `&startDate=${formaterToIsoDate(new Date(sDate))}"&endDate=${formaterToIsoDate(new Date(eDate))}`
    }
    return ''
  }

  const getSiteIdParams = () => {
    if (siteId && siteId !== "todos") return `&location=${siteId}`;
    return "";
  };




  const fetchSummariesByLocation = useFetch(`api/covid/immunization/certificate/print/summaries?paging=false&responseType=GROUP_BY_LOCATION${getParams()}`);
  const fetchSummariesByLocationToTable = useFetch(`api/covid/immunization/certificate/print/summaries?responseType=GROUP_BY_LOCATION&includeAllGroupData=true${getParams()}&page=${currentPage + 1}&pageSize=${rowsPerPage}${getSiteIdParams()}`);
  const fetchSites = useFetch('api/covid/immunization/certificate/locations?paging=false');

  if (fetchSummariesByLocation.error || fetchSummariesByLocationToTable.error || fetchSites.error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['Local Name', 'Total prints'];
  }

  const tableData = () => {
    const sitePrints = [];
    if (fetchSummariesByLocationToTable.data) {
      for (const print of fetchSummariesByLocationToTable.data.data) {
        sitePrints.push([print.locationName, print.totalPrints])
      }
    }
    return sitePrints;
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Card small className="h-100 mb-4 mt-4">
        <CardBody className=" py-0 ">
          <Row className="mb-4">
            <Col sm="4" className="d-flex mb-2 mb-sm-0 mt-4">
              <RangeDatePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
            </Col>
            <Col sm="3" className="mb-2 mb-sm-0 mt-4">
              {(!fetchSummariesByLocation.isFetching && fetchSummariesByLocation.data.data.length === 0) && <ClickableAndDeletableChips clearParams={clearParams} />}
            </Col>

            <Col sm="5" className="text-right">
              <Button size="sm" className="btn btn-outline-primary mb-2 mb-sm-0 mt-4 mr-1"onClick={() => onDateChange()}>
                {t("atualizar_dados")} <i className="fa fa-refresh" aria-hidden="true"></i>
              </Button>
              <Button size="sm" className="btn btn-outline-primary mb-2 mb-sm-0 mt-4" onClick={() => clearParams()}>
                {t("limpar_dados")} <i class="fa fa-refresh" aria-hidden="true"></i>
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <ChartComponent title='Sumário de impressões por local' summaries={fetchSummariesByLocation.data ? fetchSummariesByLocation.data.data : []} loader={fetchSummariesByLocation.isFetching} chartType='bar' />
        </Col>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <ChartComponent title='Sumário de impressões por local' summaries={fetchSummariesByLocation.data ? fetchSummariesByLocation.data.data : []} loader={fetchSummariesByLocation.isFetching} chartType='pie' />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card small>
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">Total Emissões de Certificados por Local</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className="pl-0">
                  <FormSelect
                    className="col-lg-3 mr-1"
                    id="project"
                    disabled={fetchSites.isFetching}
                    value={siteId}
                    onChange={(event) => onParamChange(event, setSiteId, history, 'location')}
                  >
                    <option value='todos'>Todos locais</option>
                    {fetchSites.data && fetchSites.data.data.map((site, index) => (
                      <option value={site.location} key={index}>
                        {site.locationName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
                {(fetchSummariesByLocationToTable && fetchSummariesByLocationToTable.data) && <TableDataExporter fileName='lista de emissoes por local-COVID-19' fileTitle='COVID-Total Emissões de Certificados por Local' tableColums={tableColums} tableData={tableData} />}
              </Row>
              <Row />
            </CardHeader>
            {fetchSummariesByLocationToTable.isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <Table isFetching={fetchSummariesByLocationToTable.isFetching} tableData={tableData} tableColumns={tableColums} />
            </CardBody>
            {fetchSummariesByLocationToTable.data && <TablePaginationDemo totalPages={fetchSummariesByLocationToTable.data} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportBySite;

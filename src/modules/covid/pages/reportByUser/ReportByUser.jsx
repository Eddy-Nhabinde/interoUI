import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormSelect,
} from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { LinearProgress } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import ChartComponent from "../../../../components/commons/chart/Chart";
import { ClickableAndDeletableChips } from "../../../../components/commons/chip/Chip";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { ErrorPage } from "../../../../pages/error";
import { onDataParamsChange, onParamChange } from "../../../../utils/services/onParamsChange";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";

const ReportByUser = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const { t } = useTranslation();

  const getUrlParams = () => {
    return {
      startDate: params.get("startDate")
        ? new Date(params.get("startDate"))
        : '',
      endDate: params.get("endDate")
        ? new Date(params.get("endDate"))
        : '',
    };
  };

  const [startDate, setStartDate] = useState(getUrlParams().startDate);
  const [endDate, setEndDate] = useState(getUrlParams().endDate);
  const [sDate, setSDate] = useState(getUrlParams().startDate);
  const [eDate, setEDate] = useState(getUrlParams().endDate);
  const [userId, setUserId] = useState(params.get("username") || '');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const history = useHistory();

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
    onDataParamsChange(history, 'startDate', 'endDate')
  };

  const getUserIdParams = () => {
    if (userId && userId !== "todos") return `&userId=${userId}`;
    return "";
  };

  const getParams = () => {
    if (sDate && eDate) {
      return `&startDate=${formaterToIsoDate(new Date(sDate))}"&endDate=${formaterToIsoDate(new Date(eDate))}`
    }
    return ''
  }

  const fetchSummaries = useFetch(`api/covid/immunization/certificate/print/summaries?paging=false&responseType=GROUP_BY_USER${getParams()}`);
  const fetchUsers = useFetch('api/covid/immunization/certificate/users');
  const fetchSummariesByUser = useFetch(`api/covid/immunization/certificate/print/summaries?responseType=GROUP_BY_USER${getParams()}&page=${currentPage + 1}&pageSize=${rowsPerPage}${getUserIdParams()}`);

  const getUserPrints = () => {
    const allPrints = [];
    if (fetchSummariesByUser.data)
      for (const user of fetchSummariesByUser.data.data) {
        allPrints.push([user.username, user.totalPrints])
      }
    return allPrints
  }


  useEffect(() => {
    getUserPrints()
  }, [fetchUsers.isFetching])

  if (fetchSummaries.error || fetchUsers.error || fetchSummariesByUser.error) {
    return (
      <ErrorPage />
    )
  }


  const tableColums = () => {
    return ['Username', 'Total prints']
  }

  const tableData = () => {
    return getUserPrints() || [];
  }



  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}

      <Card small className="h-100 mb-4 mt-4">
        <CardBody className=" py-0 ">
          <Row className="mb-4">
            <Col sm="4" className="d-flex mb-2 mb-sm-0 mt-4">
              <RangeDatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </Col>
            <Col sm="3" className="mb-2 mb-sm-0 mt-4">
              {fetchSummaries.data && fetchSummaries.data.data.length === 0 && (
                <ClickableAndDeletableChips clearParams={clearParams} />
              )}
            </Col>
            <Col sm="5" className="text-right">
              <Button
                size="sm"
                className="btn btn-outline-primary mb-2 mb-sm-0 mt-4 mr-1"
                onClick={() => onDateChange()}
              >
                {t("atualizar_dados")}
                <i className="fa fa-refresh" aria-hidden="true"></i>
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
        <Col lg="12" md="12" sm="12" className="mb-4">
          <ChartComponent title='Sumário de impressões por utilizador'
            summaries={
              fetchSummaries.data ? fetchSummaries.data.data : null
            }
            loader={fetchSummaries.isFetching}
            chartType="bar"
          />
        </Col>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <ChartComponent title='Sumário de impressões por utilizador'
            summaries={
              fetchSummaries.data ? fetchSummaries.data.data : null
            }
            loader={fetchSummaries.isFetching}
            chartType="pie"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card small>
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">Total Emissões de Certificados por Utilizador</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className="pl-0">
                  <FormSelect
                    className="col-lg-3 mr-1"
                    id="project"
                    value={userId}
                    onChange={(event) => onParamChange(event, setUserId, history, 'username')}
                  >
                    <option value='todos'>Todos utilizadores</option>
                    {fetchUsers.isFetching === false && fetchUsers.data.data.map((user, index) => (
                      <option value={user.id} key={index}>
                        {user.displayName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
                {(fetchSummariesByUser && fetchSummariesByUser.data) && <TableDataExporter fileName='lista de emissoes por utilizador-COVID-19' fileTitle='COVID-Total Emissões de Certificados por Utilizador' tableColums={tableColums} tableData={tableData} />}
              </Row>
              <Row />
            </CardHeader>
            {fetchSummariesByUser.isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <Table isFetching={fetchSummariesByUser.isFetching} tableData={tableData} tableColumns={tableColums} />
            </CardBody>
            {fetchSummariesByUser.isFetching === false && (
              <TablePaginationDemo
                totalPages={fetchSummariesByUser.data}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportByUser;

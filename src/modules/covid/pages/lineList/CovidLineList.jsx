//TODO @Celso -- Move to common  as "SummaryDataTable"

import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
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
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";
import { useHistory,useLocation } from 'react-router-dom'
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import { ErrorPage } from "../../../../pages/error";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import { onDataParamsChange } from "../../../../utils/services/onParamsChange";

const CovidLineList = () => {
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
  const [userId, setUserId] = useState(params.get("username") || '');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const tableColums = () => {
    return ['referencia', 'data_hora', 'usuario', 'id_beneficiario', 'nome_completo_beneficiario']
  }

  const getUserIdParams = () => {
    if (userId && userId !== "allusers") return `&userId=${userId}`;
    return "";
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

  const { data, error, isFetching } = useFetch(
    `/api/covid/immunization/certificate/print?page=${currentPage + 1}&pageSize=${rowsPerPage}${getParams()}${getUserIdParams()}`
  );

  const fetchUsers = useFetch('api/covid/immunization/certificate/users');

  if (error || fetchUsers.error) {
    return (
      <ErrorPage />
    )
  }

  console.log(tableColums())


  const onUserChange = (event) => {
    const url = new URL(window.location.href);
    var hasName = new URLSearchParams(url.search);
    setUserId(event.target.value);
    if (event.target.value === "allusers") {
      if (hasName.has("username")) {
        url.searchParams.delete("username");
        history.push(url.search || url.pathname);
      }
    } else {
      url.searchParams.set("username", event.target.value);
      history.push(url.search);
    }
  };

  const tableData = () => {
    const users = [];
    if (isFetching === false) {
      for (const user of data.data) {
        users.push([user.identifier, user.printDate, user.username, user.documentNumber, user.name + " " + user.surname])
      }
    }
    return users;
  }


  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}

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
          <Card small>
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">Histórico de Emissões de Certificados</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className='pl-0'>
                  <FormSelect
                    className="col-lg-3 mr-1"
                    id="project"
                    value={userId}
                    onChange={(event) => onUserChange(event)}
                  >
                    <option value='allusers'>Todos utilizadores</option>
                    {fetchUsers.isFetching === false && fetchUsers.data.data.map((user, index) => (
                      <option value={user.id} key={index}>
                        {user.displayName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
                {data && <TableDataExporter fileName='lista de historico-COVID-19' fileTitle='COVID-Histórico de Emissões de Certificados' tableData={tableData} tableColums={tableColums} />}
              </Row>
              <Row />
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <Table isFetching={isFetching} error={error} tableColumns={tableColums} tableData={tableData} />
            </CardBody>
            {isFetching === false && <TablePaginationDemo totalPages={data} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CovidLineList;

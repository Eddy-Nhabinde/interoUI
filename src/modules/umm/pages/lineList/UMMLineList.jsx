import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  DropdownItem,
  Collapse,
  Button,
  FormInput,
} from "shards-react";
import PageTitle from "../../../../components/commons/PageTitle";
import { useFetch } from "../../../../hooks/useFetch";
import { IconButton, LinearProgress } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { ErrorPage } from "../../../../pages/error";
import { modules } from "../../../modulesContent";
import AddIcon from "@mui/icons-material/Add";
import serverOptions from "../../utils/data/variablesServer.json";
import { capitalize } from "../../../../utils/commons/toCapitalize";
import FloatingButton from "../../../../components/commons/floattingbutton/floatingButton";

const UMMLineList = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const { t } = useTranslation();
  const history = useHistory();

  const getUrlParams = () => {
    return {
      module: urlParams.get("module") ? urlParams.get("module") : "",
      name: urlParams.get("name") ? urlParams.get("name") : "",
      userType: urlParams.get("userType") ? urlParams.get("userType") : "",
    };
  };

  const [module, setModule] = useState(getUrlParams().module);
  const [name, setName] = useState(getUrlParams().name);
  const [userType, setUserType] = useState(getUrlParams().userType);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getNameParams = () => {
    if (name && name !== "all") return `&name=${name}`;
    return "";
  };
  const getUserTypeParams = () => {
    if (userType && userType !== "all") return `&userType=${userType}`;
    return "";
  };
  const getModuleParams = () => {
    if (module) {
      return `&module=${module}`;
    }
    return "";
  };

  const onDateChangeName = (event) => {
    setName(event.target.value);
    /*     const url = new URL(window.location.href);
    if (name) {
      url.searchParams.set("name", event.target.value);
      history.push(url.search);
    } */
  };

  const onDateChangeUserType = (event) => {
    setUserType(event.target.value);
    /*     const url = new URL(window.location.href);
    if (userType) {
      url.searchParams.set("userType", event.target.value);
      history.push(url.search);
    } */
  };

  const onDateChangeModule = (event) => {
    setModule(event.target.value);
    /*     const url = new URL(window.location.href);
    if (module) {
      url.searchParams.set("module", event.target.value);
      history.push(url.search);
    } */
  };

  const clearParams = () => {
    setName("");
    setModule("");
    setUserType("");

    /*     const url = new URL(window.location.href);
    var hasParam = new URLSearchParams(url.search);
    if (hasParam.has("name")) {
      url.searchParams.delete("name");
    }
    if (hasParam.has("module")) {
      url.searchParams.delete("module");
    }
    if (hasParam.has("userType")) {
      url.searchParams.delete("userType");
    }
    history.push(url.search || url.pathname); */
  };

  const fetchUsers = useFetch("api/users");
  const fetchSummariesByUser = useFetch(
    `api/users?page=${currentPage +
      1}&pageSize=${rowsPerPage}${getModuleParams()}${getNameParams()}${getUserTypeParams()}`
  );

  if (fetchUsers.error || fetchSummariesByUser.error) {
    return <ErrorPage />;
  }

  const dropdownActions = (id, userType, userSystem) => {
    return (
      <>
        <IconButton
          id="dropdownMenu2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          className="ml-2"
        >
          <i
            className="material-icons text-dark"
            style={{ fontSize: 15, cursor: "pointer" }}
          >
            more_vert
          </i>
        </IconButton>
        <Collapse
          className="dropdown-menu"
          aria-labelledby="dropdownMenu2"
          right
          small
        >
          <DropdownItem
            tag={Link}
            to={`/umm/user/detail?userType=${userType}&userId=${id}`}
            className="text-secondary"
          >
            <i className="material-icons">info_outline</i> Detalhes
          </DropdownItem>
          {(userType === "INTERNAL" || userType === "Internal") && (
            <DropdownItem tag={Link} to="/home" className="text-danger">
              <i className="material-icons">block</i> Bloquear
            </DropdownItem>
          )}
        </Collapse>
      </>
    );
  };

  const getUserData = () => {
    const allPrints = [];
    if (fetchSummariesByUser.data)
      for (const user of fetchSummariesByUser.data.data) {
        allPrints.push([
          user.name,
          user.username,
          capitalize(user.userType),
          dropdownActions(user.id, user.userType),
        ]);
      }
    return allPrints;
  };

  const tableColums = () => {
    return ["Name", "Username", "Type", "Actions"];
  };

  const tableData = () => {
    return getUserData() || [];
  };

  useEffect(() => {
    getUserData();
  }, [fetchUsers.isFetching]);

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <FloatingButton
        title={"Add new user"}
        icon={<AddIcon />}
        action={() => history.push(`/umm/user/registration`)}
      />

      <Row noGutters className="page-header py-4">
        <PageTitle title={"Registered users"} className="text-sm-left" />
      </Row>
      <Row className={"mb-4"}>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Row>
                <Col className="col-lg-3 mb-3 mt-2">
                  <h6 className="m-0 mb-1">Filter by name</h6>
                  <FormInput
                    id="#name"
                    placeholder="Name"
                    value={name}
                    onChange={onDateChangeName}
                  />
                </Col>
                <Col className="col-lg-3 mb-3 mt-2">
                  <h6 className="m-0 mb-1">Filter by type</h6>
                  <FormSelect
                    className=" mb-2 mr-1"
                    id="project"
                    value={userType}
                    onChange={onDateChangeUserType}
                  >
                    <option value="all">All types</option>
                    <option value="Internal">Internal</option>
                    {serverOptions.options.map((server) => (
                      <option value={"External"}>{server.id}</option>
                    ))}
                  </FormSelect>
                </Col>
                <Col className="col-lg-3 mb-3 mt-2">
                  <h6 className="m-0 mb-1">Filter by module</h6>
                  <FormSelect
                    className=" mb-2 mr-1"
                    id="project"
                    value={module}
                    onChange={onDateChangeModule}
                  >
                    <option value="all">All modules</option>
                    {modules.map((module, index) => (
                      <option value={module.shortName} key={index}>
                        {module.shortName}
                      </option>
                    ))}
                  </FormSelect>
                </Col>
                <Col className="col-lg-3 mb-3 mt-2 d-flex justify-content-end align-items-center">
                  <div>
                    <Button
                      size="sm"
                      className="btn btn-outline-primary mb-2 mb-sm-0 mt-4"
                      onClick={clearParams}
                    >
                      {t("limpar_dados")}
                      <i class="fa fa-refresh" aria-hidden="true"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row />
            </CardHeader>
            {fetchSummariesByUser.isFetching && <LinearProgress />}
            <CardBody className="p-4 pb-3">
              <Table
                isFetching={fetchSummariesByUser.isFetching}
                tableData={tableData}
                tableColumns={tableColums}
              />
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

export default UMMLineList;

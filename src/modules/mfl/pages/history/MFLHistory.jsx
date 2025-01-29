import { Avatar, LinearProgress } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormSelect,
  Button,
  FormInput,
} from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import { useTranslation } from "react-i18next";
import dateFormat from "dateformat";
import { ErrorPage } from "../../../../pages/error";
import "../../assets/styles/history.css";
import { capitalize } from "../../../../utils/commons/toCapitalize";
import SuggestUpdate from "../../components/popover/popover";
import { hasNull, verifyData } from "../../utils/verifyData";

const MFLHistory = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { t } = useTranslation();

  const [provinceId, setProvinceId] = useState(params.get("province") || "");
  const [districtId, setDistrictId] = useState(params.get("district") || "");
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getProvinceIdParams = () => {
    if (provinceId && provinceId !== "todos") return `&province=${provinceId}`;
    return "";
  };

  const getDistrictIdParams = () => {
    if (districtId && districtId !== "todos") return `&district=${districtId}`;
    return "";
  };
  const getNameParams = () => {
    if (name) return `&name=${name}`;
    return "";
  };

  const { data, error, isFetching } = useFetch(
    `/api/mfl/orgUnits?page=${currentPage +
      1}&pageSize=${rowsPerPage}${getProvinceIdParams()}${getDistrictIdParams()}${getNameParams()}`
  );
  const provinces = useFetch("api/cmam/mfl?level=province");
  const district = useFetch(`api/cmam/mfl?parent=${provinceId}&level=district`);

  if (error) {
    return <ErrorPage />;
  }

  const clearParams = () => {
    setProvinceId("");
    setDistrictId("");
    setName("");
  };

  const handleChangeProvince = (e) => {
    setProvinceId(e.target.value);
    setDistrictId("");

  };

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}

      <Row>
        <Col>
          <Card small className="my-5">
            <CardHeader
              style={{ flexDirection: "column" }}
              className="d-flex align-itmes-center"
            >
              <h6 className="m-0 mb-4">
                Histórico de Actualizações de Unidades Sanitárias
              </h6>
              <Row className="w-100 d-flex align-items-center mx-0">
                <Col sm="3" className="pl-0">
                  <h6>{t("filtrar-provincia")}</h6>
                  <FormSelect
                    className=""
                    id="project"
                    value={provinceId}
                    onChange={handleChangeProvince}
                    
                  >
                    <option value="todos">Todas unidades</option>
                    {provinces.isFetching === false && provinces.data &&
                      provinces.data.organisationUnits.map(
                        (province, index) => (
                          <option value={province.id} key={index}>
                            {province.name}
                          </option>
                        )
                      )}
                  </FormSelect>
                </Col>
                <Col sm="3" className="pl-0">
                  <h6>{t("filtrar-distrito")}</h6>
                  <FormSelect
                    className=""
                    value={districtId}
                    onChange={(event) => setDistrictId(event.target.value)}
                    id="district"
                    
                  >
                    <option value="todos">{t("filtrar-distrito")}</option>
                    {district.data &&
                      district.data.organisationUnits.map((district, index) => (
                        <option value={district.id}>{district.name}</option>
                      ))}
                  </FormSelect>
                </Col>
                <Col sm="3" className="pl-0">
                  <h6>Filtrar por nome da US</h6>
                  <FormInput
                    className=""
                    placeholder="Digitar nome..."
                    id="usName"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    
                  />
                </Col>
                <Col sm="3" className="d-flex justify-content-end pt-4">
                  {data && (provinceId || districtId || name) && (
                    <div>
                      <Button
                        size="sm"
                        className="btn btn-outline-primary mr-2 mt-1"
                        onClick={clearParams}
                      >
                        {t("limpar_dados")}
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                      </Button>
                    </div>
                  )}
                </Col>
              </Row>
              <Row />
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className="px-4 pb-3">
              {data && data.organisationUnits &&(
                <>
                  {data.organisationUnits.length === 0 ? (
                    <Row
                      className="mt-1 d-flex align-items-center justify-content-center py-4"
                      colspan={data.organisationUnits.length}
                    >
                      <h4>Não foram encontrados dados</h4>
                    </Row>
                  ) : (
                    <>
                      {data.organisationUnits.map((row, index) => (
                        <Row
                          className="mt-1 p-3 border-bottom d-flex pb-4"
                          key={index}
                        >
                          <Col
                            lg="1"
                            md="1"
                            sm="1"
                            className=" d-flex align-items-center justify-content-center"
                          >
                            <Avatar className="avatar">
                              <UpdateIcon />
                            </Avatar>
                          </Col>
                          <Col lg="10" md="10" sm="10" className="">
                            <h6 className="history-title">
                              {row.HealthFacilityName}
                            </h6>
                            <p>
                              {`${capitalize(
                                row.Province
                              )}, Distrito de ${capitalize(row.District)}`}
                            </p>
                            <p>
                              Última actualização em{" "}
                              <span className="update-date">
                                {dateFormat(row.LastUpdated) || "---"}
                              </span>
                            </p>{" "}
                          </Col>
                          <Col
                            lg="1"
                            md="1"
                            sm="1"
                            className=" d-flex align-items-center"
                          >
                            {hasNull(row) ? (
                              <SuggestUpdate id={row.id} />
                            ) : null}
                          </Col>
                        </Row>
                      ))}
                    </>
                  )}
                </>
              )}
            </CardBody>
            {isFetching === false && (
              <TablePaginationDemo
                totalPages={data}
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

export default MFLHistory;

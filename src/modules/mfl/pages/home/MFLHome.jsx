import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  CardBody,
  Button,
} from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import ChartComponent from "../../components/chart/Chart";
import { ErrorPage } from "../../../../pages/error";
import MapHome from "../../components/map/map";
import { LinearProgress } from "@mui/material";
import "../../assets/styles/map.css";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import RangeDatePicker from "../../../../components/commons/inputs/RangeDatePicker";

const MFLHome = () => {
  const { t } = useTranslation();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [name, setName] = useState(urlParams.get("name") || "");
  const [provinceId, setProvinceId] = useState(urlParams.get("province") || "");
  const [districtId, setDistrictId] = useState(urlParams.get("district") || "");

  const getNameParams = () => {
    if (name) return `&name=${name}`;
    return "";
  };

  const getProvinceIdParams = () => {
    if (provinceId && provinceId !== "todos") return `&province=${provinceId}`;
    return "";
  };

  const getDistrictIdParams = () => {
    if (districtId && districtId !== "todos") return `&district=${districtId}`;
    return "";
  };

  const getDashboardParams = () => {
    if (districtId && districtId !== "todos") return `?parent=${districtId}`;
    else if (provinceId && provinceId !== "todos")
      return `?parent=${provinceId}`;
    return "";
  };

  //const orgUnits1 = useFetch(`/api/mfl/organisationUnits?paging=1`);
  const orgUnits = useFetch(
    `/api/mfl/orgUnits?paging=${false}${getNameParams()}${getProvinceIdParams()}${getDistrictIdParams()}`
  );
  const { data, error, isFetching } = useFetch(`/api/cmam/mfl`);
  const provinces = useFetch("api/cmam/mfl?level=province");
  const district = useFetch(`api/cmam/mfl?parent=${provinceId}&level=district`);
  const dashboard = useFetch(`api/mfl/dashboard${getDashboardParams()}`);

  const getUserPrints = () => {
    const allUs = [];
    if (data)
      for (const org of data.organisationUnits) {
        allUs.push([org.name, org.province]);
      }
    return allUs;
  };

  useEffect(() => {
    getUserPrints();
  }, [isFetching]);

  if (error || provinces.error) {
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
    <Container fluid className="main-content-container px-4 py-4">
      <Card small className="h-100 mb-4">
        <CardBody className="">
          <Row className="">
            <Col className="col-lg-7  d-flex justify-content-start">
              <FormSelect
                className="ml-1"
                value={provinceId}
                onChange={handleChangeProvince}
                id="project"
              >
                <option value="todos">{t("filtrar-provincia")}</option>
                {provinces.data &&
                  provinces.data.organisationUnits.map((province, index) => (
                    <option value={province.id}>{province.name}</option>
                  ))}
              </FormSelect>
              <FormSelect
                className="ml-1"
                value={districtId}
                onChange={(event) => setDistrictId(event.target.value)}
                id="project"
              >
                <option value="todos">{t("filtrar-distrito")}</option>
                {district.data &&
                  district.data.organisationUnits.map((district, index) => (
                    <option value={district.id}>{district.name}</option>
                  ))}
              </FormSelect>
            </Col>

            <Col className="col-lg-5 d-flex justify-content-start">
              {data && (name || provinceId || districtId) && (
                <div>
                  <Button
                    size="sm"
                    className="btn btn-outline-primary mr-2"
                    onClick={clearParams}
                  >
                    {t("limpar_dados")}
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row>
        <Col lg="7" md="7" sm="7" className="mb-4">
          <Card small>
            <CardHeader
              style={{ flexDirection: "column" }}
              className="border-bottom"
            >
              <Row className="d-flex align-items-center px-0">
                <Col lg="7" md="7" sm="7" className="">
                  <h6 className="m-0">{t("mapa-us")}</h6>
                </Col>
                <Col lg="5" md="5" sm="5" className="px-0 pr-2">
                  <InputGroup seamless className="">
                    <InputGroupAddon type="prepend">
                      <InputGroupText>
                        <i class="material-icons">search</i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <FormInput
                      className=""
                      placeholder={t("pesquisar-us-nome")}
                      id="usName"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </CardHeader>
          </Card>
          {orgUnits.isFetching && <LinearProgress />}

          <MapHome
            container={"mapHome"}
            coordinates={orgUnits.data && orgUnits.data.organisationUnits}
            zoom={4.61}
            legend={false}
          />
        </Col>
        <Col lg="5" md="5" sm="5" className="mb-4">
          <div style={{ height: "50%" }}>
            <ChartComponent
              title={"Unidades Sanitárias por propriedade"}
              height="182"
              data={dashboard.data ? dashboard.data.healthFacilitySector : null}
              loader={isFetching}
              chartType="pie"
              legend={true}
            />
          </div>
          <div className="mt-4" style={{ height: "50%" }}>
            <ChartComponent
              title={t("us-por-nivel")}
              height="182"
              data={dashboard.data ? dashboard.data.healthFacilityLevels : null}
              loader={isFetching}
              chartType="pie"
              legend={true}
            />
          </div>
        </Col>

        <Col lg="12" md="12" sm="12" className="my-4">
          <div className="mb-3">
            <ChartComponent
              title={t("us-por-tipo")}
              height="110"
              data={dashboard.data ? dashboard.data.healthFacilityTypes : null}
              loader={isFetching}
              chartType="bar"
              legend={false}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MFLHome;

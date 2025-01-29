import { IconButton, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, FormSelect, Button, FormInput } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import TableToExport from "../../../../components/commons/table/TableToExport";
import { ErrorPage } from "../../../../pages/error";
import { useHistory } from 'react-router-dom'
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from "react-i18next";


const OrgUnits = () => {
  const { t } = useTranslation();
  const history = useHistory()
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState(urlParams.get("name") || '');
  const [provinceId, setProvinceId] = useState(urlParams.get("province") || '');
  const [districtId, setDistrictId] = useState(urlParams.get("district") || '');
  const [classificationId, setClassificationId] = useState(urlParams.get("classification") || '');

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

  const getClassificationParams = () => {
    if (classificationId && classificationId !== "todos") return `&healthFacilityClassification=${classificationId}`;
    return "";
  }

  const { data, error, isFetching } = useFetch(`/api/mfl/orgUnits?page=${currentPage + 1}&pageSize=${rowsPerPage}${getNameParams()}${getProvinceIdParams()}${getDistrictIdParams()}${getClassificationParams()}`);
  const { data: dataToExport, error: errorExport, isFetching: isFetchingExport } = useFetch(`/api/mfl/orgUnits?paging=${false}${getNameParams()}${getProvinceIdParams()}${getDistrictIdParams()}${getClassificationParams()}`);
  const provinces = useFetch('api/cmam/mfl?level=province')
  const district = useFetch(`api/cmam/mfl?parent=${provinceId}&level=district`)
  const classifications = useFetch("/api/mfl/healthFacilityClassifications?paging=false");

  //console.log('dataToExport', dataToExport)
  if (error) {
    return (
      <ErrorPage />
    )
  }

  const seeMore =(id)=>{
    return (
      <IconButton style={{marginTop: -10}} onClick={()=> history.push(`/mfl/mfl-details/${id}`)}>
        <InfoOutlinedIcon fontSize="small" color="primary"/>
      </IconButton>
    )
  }

  const tableColums = () => {
    return ['Código da US','US', 'Província', 'Distrito',  ''];
  }

  const tableData = () => {
    const orgUnits = [];
    if(data.organisationUnits){
    for (const orgUnit of data.organisationUnits) {
      orgUnits.push([ orgUnit.HealthFacilityCode, orgUnit.HealthFacilityName, orgUnit.Province, orgUnit.District, seeMore(orgUnit.id)])
    }}
    return orgUnits;
  }
  
  const tableColumExport = () => {
    return ['Código da US','US', 'Província', 'Distrito', 'Classificação', 'Tipo', 'Nível', "Coordenadas"];
  }

  const formatCoordinates = (geometry)=>{
    if(geometry) return `(${geometry.coordinates[0]}, ${geometry.coordinates[1]})`
    return "---"
  }

  const tableDataExport = () => {
    const orgUnits = [];
    if(dataToExport){
      for (const orgUnit of dataToExport.organisationUnits) {
        orgUnits.push([ orgUnit.HealthFacilityCode, orgUnit.HealthFacilityName, orgUnit.Province || '---', orgUnit.District || '---', orgUnit.HealthFacilityClassification || '---', orgUnit.HealthFacilityType || '---', orgUnit.HealthFacilityLevel || '---', formatCoordinates(orgUnit.Geometry)])
      }
    }
    return orgUnits;
  }

  const clearParams = () => {
    setName("");
    setProvinceId("");
    setDistrictId("");
    setClassificationId("");
  };

  const handleChangeProvince = (e) => {
    setProvinceId(e.target.value);
    setDistrictId("");

  };
  
  return (
    <Container fluid className="main-content-container px-4">
      <Row className="h-100 mb-4 mt-4">
        <Col>
          <Card small>
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">{t("lista-us")}</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className="col-lg-9  d-flex justify-content-start">
                  <FormInput
                    className=""
                    placeholder="Digitar nome..."
                    id="usName"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  /> 
                  <FormSelect
                    className="ml-1"
                    value={provinceId}
                    onChange={handleChangeProvince}
                    id="project"
                  >
                    <option value='todos'>{t("filtrar-provincia")}</option>
                    {
                      provinces.data && provinces.data.organisationUnits.map((province, index) => (
                        <option value={province.id}>{province.name}</option>
                      ))
                    }
                  </FormSelect>
                  <FormSelect
                    className="ml-1"
                    value={districtId}
                    onChange={(event) => setDistrictId(event.target.value)}
                    id="project"
                  >
                    <option value='todos'>{t("filtrar-distrito")}</option>
                    {
                      district.data && district.data.organisationUnits.map((district, index) => (
                        <option value={district.id}>{district.name}</option>
                      ))
                    }
                  </FormSelect>
                  <FormSelect
                    className="ml-1"
                    value={classificationId}
                    onChange={(event) => setClassificationId(event.target.value)}
                    id="project"
                  >
                    <option value='todos'>Filtrar por classificação</option>
                    {
                      classifications.data && classifications.data.healthFacilityClassifications.map((classification, index) => (
                        <option value={classification.id}>{classification.name}</option>
                      ))
                    }
                  </FormSelect>
                </Col>
                
                <Col className="col-lg-3 d-flex justify-content-end">
                  {(data && (name || provinceId || districtId || classificationId)) && (
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

                  {data && <TableDataExporter fileName='Lista de Unidades Sanitárias - MFL-External' fileTitle='MFL-Lista de Unidades Sanitárias' tableColums={tableColumExport} tableData={tableDataExport} isFetching={isFetchingExport} />}
           
                </Col>
                
              </Row>
              <Row />
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <Table isFetching={isFetching} error={error} tableColumns={tableColums} tableData={tableData} />
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

export default OrgUnits;

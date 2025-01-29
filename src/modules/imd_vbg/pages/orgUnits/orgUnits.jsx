import { IconButton, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, FormSelect, Button, FormInput } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { ErrorPage } from "../../../../pages/error";
import { useHistory } from 'react-router-dom'
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTranslation } from "react-i18next";
import TableToExport from "../../../../components/commons/table/TableToExport";
import PageTitle from "../../../../components/commons/PageTitle";


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

  const { data, error, isFetching } = useFetch(`/api/mfl/organisationUnits?page=${currentPage + 1}&pageSize=${rowsPerPage}${getNameParams()}${getProvinceIdParams()}${getDistrictIdParams()}${getClassificationParams()}`);
  const { data: dataToExport, error: errorExport, isFetching: isFetchingExport } = useFetch(`/api/mfl/organisationUnits?paging=${false}${getNameParams()}${getProvinceIdParams()}${getDistrictIdParams()}${getClassificationParams()}`);
  const provinces = useFetch('api/cmam/mfl?level=province')
  const district = useFetch(`api/cmam/mfl?parent=${provinceId}&level=district`)
  const classifications = useFetch("/api/mfl/healthFacilityClassifications?paging=false");

  //console.log('dataToExport', dataToExport)

  if (error) {
    return (
      <ErrorPage />
    )
  }

  const seeMore = (id) => {
    return (
      <IconButton title="Detalhes" style={{ marginTop: -10 }} onClick={() => history.push(`/mfl-internal/orgunit-details/${id}`)}>
        <InfoOutlinedIcon fontSize="small" color="primary" />
      </IconButton>
    )
  }

  const tableColums = () => {
    return ['Código da US', 'US', 'Província', 'Distrito', 'Acções'];
  }

  const tableData = () => {
    const orgUnits = [];
    if (data.organisationUnits)
      for (const orgUnit of data.organisationUnits) {
        orgUnits.push([orgUnit.HealthFacilityCode, orgUnit.HealthFacilityName, orgUnit.Province, orgUnit.District, seeMore(orgUnit.id)])
      }
    return orgUnits;
  }

  const formatCoordinates = (geometry)=>{
    if(geometry) return `(${geometry.coordinates[0]}, ${geometry.coordinates[1]})`
    return "---"
  }

  const tableColumExport = () => {
    return ['Código da US','US', 'Província', 'Distrito', 'Classificação', 'Tipo', 'Nível', "Coordenadas"];
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
      <PageTitle
        title={"Visão Geral"}
        className="text-sm-left mb-3"
      />
    </Container>
  );
};

export default OrgUnits;

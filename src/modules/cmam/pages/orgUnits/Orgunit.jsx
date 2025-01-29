import { LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, FormSelect } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { ErrorPage } from "../../../../pages/error";
import { useHistory, useLocation } from 'react-router-dom'
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import { onParamChange } from "../../../../utils/services/onParamsChange";
import { useTranslation } from "react-i18next";
import TableToExport from "../../../../components/commons/table/TableToExport";

const OrgUnits = () => {
  const history = useHistory()
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { t } = useTranslation();


  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [provinceId, setProvinceId] = useState(params.get("province") || '');
  const [districtId, setDistrictId] = useState(params.get("district") || '');
  const [hasOu, setHasOu] = useState(params.get("hasMapping") || '');


  const getProvinceIdParams = () => {
    if (provinceId && provinceId !== "todos") return `&province=${provinceId}`;
    return "";
  };

  const getDistrictIdParams = () => {
    if (districtId && districtId !== "todos") return `&district=${districtId}`;
    return "";
  };

  const getParams = () => {
    if (hasOu === 'false' || hasOu === 'true') {
      return `&hasMapping=${hasOu}`
    }
    return ''
  }

  const { data, error, isFetching } = useFetch(`/api/cmam/mfl?page=${currentPage + 1}&pageSize=${rowsPerPage}${getProvinceIdParams()}${getDistrictIdParams()}${getParams()}`);
  const { data: dataToExport, error: errorExport, isFetching: isFetchingExport } = useFetch(`/api/cmam/mfl?paging=${false}${getProvinceIdParams()}${getDistrictIdParams()}${getParams()}`);
  const provinces = useFetch('api/cmam/mfl?level=province')
  const district = useFetch(`api/cmam/mfl?parent=${provinceId}&level=district`)

  if (error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['provincia', 'distrito', 'unidade-sanitaria', 'codigo-us', 'us-cmam'];
  }
  const tableColumExport = () => {
    return ['Província', 'Distrito', 'Unidade Sanitária', 'Código da Unidade Sanitária', 'Unidade Sanitária na CMAM'];
  }

  const tableData = () => {
    const orgUnits = [];
    for (const orgUnit of data.organisationUnits) {
      orgUnits.push([orgUnit.Province, orgUnit.District, orgUnit.HealthFacilityName, orgUnit.HealthFacilityCode, orgUnit.cmamName || '---'])
    }
    return orgUnits;
  }
  const tableDataExport = () => {
    const orgUnits = [];
    if(dataToExport){
      for (const orgUnit of dataToExport.organisationUnits) {
        orgUnits.push([orgUnit.Province, orgUnit.District, orgUnit.HealthFacilityName, orgUnit.HealthFacilityCode, orgUnit.cmamName || '---'])
      }
    }
    
    return orgUnits;
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row className="h-100 mb-4 mt-4">
        <Col>
          <Card small>
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">{t("lista-us")}</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className='pl-0'>
                  <FormSelect
                    className="col-lg-3 mr-1"
                    value={provinceId}
                    disabled={provinces.isFetching}
                    onChange={(event) => onParamChange(event, setProvinceId, history, 'province')}
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
                    className="col-lg-3 mr-1"
                    value={districtId}
                    disabled={district.isFetching}
                    onChange={(event) => onParamChange(event, setDistrictId, history, 'district')}
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
                    className="col-lg-3 mr-1"
                    value={hasOu}
                    onChange={(event) => onParamChange(event, setHasOu, history, 'hasMapping')}
                    id="project"
                  >
                    <option value='todos'>{t("mostrat-todos")}</option>
                    <option value='true'>{t("mapeados")}</option>
                    <option value='false'>{t("nao-mapeados")}</option>
                  </FormSelect>
                </Col>
                {data && <TableDataExporter fileName='lista de unidades sanitarias-CMAM' fileTitle='CMAM-Lista de Unidades Sanitárias' tableColums={tableColumExport} tableData={tableDataExport} isFetching={isFetchingExport} />}
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

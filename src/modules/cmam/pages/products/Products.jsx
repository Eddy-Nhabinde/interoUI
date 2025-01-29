import { LinearProgress } from "@mui/material";
import React, {useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, FormSelect } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { useHistory, useLocation } from 'react-router-dom'
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { onParamChange } from "../../../../utils/services/onParamsChange";
import { ErrorPage } from "../../../../pages/error";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import { useTranslation } from "react-i18next";
import TableToExport from "../../../../components/commons/table/TableToExport";

const Products = () => {
  const { t } = useTranslation();
  const history = useHistory()
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [areaId, setAreaId] = useState(params.get("area") || '');
  const [statusId, setStatusId] = useState(params.get("status") || '');
  const [hasInventoryDataElement, setHasInventoryDataElement] = useState(params.get('hasInventoryDataElement')||'');

  const getAreaIdParams = () => {
    if (areaId && areaId !== "todos") return `&area=${areaId}`;
    return "";
  };

  const getStatusIdParams = () => {
    if (statusId && statusId !== "todos") return `&status=${statusId}`;
    return "";
  };

  const getParams = () => {
    if (hasInventoryDataElement === 'false'||hasInventoryDataElement === 'true') {
      return `&hasInventoryDataElement=${hasInventoryDataElement}`
    }
    return ''
  }

  const { data, error, isFetching } = useFetch(`/api/cmam/products?include=area&page=${currentPage + 1}&pageSize=${rowsPerPage}${getAreaIdParams()}${getStatusIdParams()}${getParams()}`);
  const { data: dataToExport, error: errorExport, isFetching: isFetchingExport } = useFetch(`/api/cmam/products?include=area&paging=${false}${getAreaIdParams()}${getStatusIdParams()}${getParams()}`);

  const feetchAreas = useFetch(`/api/cmam/areas?paging=false`);

  if (error || feetchAreas.error) {
    return (
      <ErrorPage />
    )
  }

  const tableColums = () => {
    return ['area', 'codigo', 'desc', 'estado', 'dde'];
  }
  const tableColumExport = () => {
    return ['Área', 'Código', 'Descrição', 'Estado', 'Metadado DHIS2'];
  }

  const tableData = () => {
    const products = []
    for (const product of data.products) {
      products.push([product.areas[0] ? product.areas[0].name : "---", product.code, product.name, product.status,
      product.inventoryDataElementName ? <a target='blank' className="data-element__link" href={`${data.serverUrl}//dhis-web-maintenance/index.html#/edit/dataElementSection/dataElement/${product.inventoryDataElementId}`}>{product.inventoryDataElementName}</a> : '---'])
    }
    return products;
  }

  const tableDataExport = () => {
    const products = []
    if(dataToExport){
      for (const product of dataToExport.products) {
        products.push([product.areas[0] ? product.areas[0].name : "---", product.code, product.name, product.status,
        product.inventoryDataElementName || '---'])
      }
    }
    return products;
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row className="h-100 mb-4 mt-4">
        <Col>
          <Card small>
            <CardHeader style={{ flexDirection: 'column' }} className="border-bottom d-flex align-itmes-center">
              <h6 className="m-0 mb-2">{t("lista-produto")}</h6>
              <Row className='w-100 d-flex align-items-center mx-0'>
                <Col className='pl-0'>
                  <FormSelect
                    disabled={feetchAreas.isFetching}
                    className="col-lg-3 mr-1"
                    id="project"
                    value={areaId}
                    onChange={(event) => onParamChange(event, setAreaId, history, 'area')}
                  >
                    <option value='todos'>{t("filtrar-area")}</option>
                    {
                      feetchAreas.data && feetchAreas.data.areas.map(area => (
                        <option value={area.code}>{area.name}</option>
                      ))
                    }
                  </FormSelect>
                  <FormSelect
                    disabled={feetchAreas.isFetching}
                    className="col-lg-3 mr-1"
                    id="project"
                    value={statusId}
                    onChange={(event) => onParamChange(event, setStatusId, history, 'status')}
                  >
                    <option value='todos'>{t("filtrar-estado")}</option>
                    <option value='Activo'>{t("activo")}</option>
                    <option value='Inactivo'>{t("inactivo")}</option>
                  </FormSelect>

                  <FormSelect
                    disabled={feetchAreas.isFetching}
                    className="col-lg-3  mr-1"
                    id="project"
                    value={hasInventoryDataElement}
                    onChange={(event) => onParamChange(event, setHasInventoryDataElement, history, 'hasInventoryDataElement')}
                  >
                    <option value='todos'>{t("mostrat-todos")}</option>
                    <option value='true'>{t("mapeados")}</option>
                    <option value='false'>{t("nao-mapeados")}</option>
                  </FormSelect>
                </Col>
                {data && <TableDataExporter fileName='lista de produtos-CMAM' fileTitle='CMAM-Lista de Produtos' tableColums={tableColumExport} tableData={tableDataExport} isFetching={isFetchingExport} />}
              </Row>
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

export default Products;

import React, { useState, useRef } from "react";
import { LinearProgress } from "@mui/material";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { useTranslation } from "react-i18next";
import { TableDataExporter } from "../../../../components/commons/dataExporter/TableDataExporter";
import PageTitle from "../../../../components/commons/PageTitle";
import { getServerData } from "../../utils/severData/getServerData";

const SIRCEVHome = () => {
  const tabColumns = ['Província', 'Distrito', 'Unidade Sanitária', 'Data']
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [syncId, setSyncId] = useState(null);
  const { data, error, isFetching } = useFetch(`api/mfl/syncs/summaries?page=${currentPage}&pageSize=${rowsPerPage}`);
  const { data: servers, error: serverErr, isFetching: isFetchingServers } = useFetch(`api/mfl/syncs/servers?paging=false&isMaster=false`)
  const { getIcon } = getServerData({ setSyncId })

  const tableColumns = () => {
    return tabColumns
  }

  const AllData = () => {
    if (data) return data.data
    else return data
  }

  const tableData = () => {
    const events = [];
    if (isFetching === false) {
      const dados = data.data
      for (let index = 0; index < dados.length; index++) {
        events.push([dados[index].provinceName, dados[index].districtName, dados[index].orgUnitName, dados[index].date, ...getIcon(dados[index], tabColumns, index)])
      }
    }
    return events
  }

  if (servers) {
    if (servers.servers) {
      const serverData = servers.servers
      for (let a = 0; a < serverData.length; a++) {
        tabColumns.push(serverData[a].name)
      }
    }
  }


  return (
    <Container fluid className="main-content-container px-4">
      <PageTitle
        title={"Visão Geral"}
        className="text-sm-left mb-3"
      />

      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Row className='w-100'>
                <Col>
                  <h6 className="m-0 mb-2">{t("ultima_sincronizacao")}</h6>
                </Col>
                {data && <TableDataExporter fileName='lista de historico-SIRCEV' fileTitle='SIRCEV-Lista de Histórico' tableData={tableData} tableColumns={tableColumns} />}
              </Row>
              <Row />
            </CardHeader>
            {(isFetching) && <LinearProgress />}
            <CardBody className="p-0 pb-3">
              <Table syncId={syncId} component="Details" allData={AllData()} isFetching={isFetching} error={error} tableColumns={tableColumns} tableData={tableData} />
            </CardBody>
            {isFetching === false && <TablePaginationDemo totalPages={data} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default SIRCEVHome;

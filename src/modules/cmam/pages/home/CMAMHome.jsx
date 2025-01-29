
import React from "react";
import { Container, Row, Col, Card, CardBody, Button } from "shards-react";
import { useTranslation } from "react-i18next";
import SyncIcon from '@mui/icons-material/Sync';
import { Avatar, Fab, Skeleton } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import EnhancedTable from "../../../../components/commons/table/MaterialTable";
import { BASE_URL, requestHeader, useFetch } from "../../../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ErrorPage } from "../../../../pages/error";

const CMAMHome = () => {
  const { t } = useTranslation();
  const [emails, setEmails] = useState([])
  const [loadEmails, setLoadEmails] = useState(false);
  const [error, setError] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const getEmails = async () => {
    setLoadEmails(true)
    await axios.get(`${BASE_URL}/api/cmam/admins`, requestHeader())
      .then(response => {
        setEmails(response.data.admins)
      }).catch(error => {
        setError(true)
      })
    setLoadEmails(false)
  }

  useEffect(() => {
    getEmails()
  }, [refetch])

  if (error) {
    return <ErrorPage />
  }

  const nextSync = useFetch(`/api/cmam/nextSync`);
  const lastSync = useFetch(`/api/cmam/lastSync`);

  return (
    <Container fluid className="main-content-container px-4">
      <Row className="w-100 pt-4 mx-0">
        <Col xs={12} className="px-0">
          <Card>
            <CardBody className='px-5'>
              <Row className="w-100 mx-0 px-0">
                {
                  (nextSync.isFetching || lastSync.isFetching) ?
                    <>
                      <Col lg={5} className="mt-1 p-3  d-flex pb-4 border-right">
                        <Col lg="1" md="1" sm="1" className=" d-flex align-items-center justify-content-center">
                          <Skeleton variant="circular" width={40} height={40} />
                        </Col>
                        <Col lg="10" md="10" sm="10" className="ml-3">
                          <h6 className="history-title" style={{ fontSize: "0.9rem" }}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                          </h6>
                          <p style={{ fontSize: "0.9rem" }}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          </p>{" "}
                        </Col>
                        <Col
                          lg="1"
                          md="1"
                          sm="1"
                          className=" d-flex align-items-center"
                        >
                        </Col>
                      </Col>
                      <Col lg={5}
                        className="mt-1 p-3  d-flex pb-4"
                      >
                        <Col
                          lg="1"
                          md="1"
                          sm="1"
                          className=" d-flex align-items-center justify-content-center"
                        >
                          <Skeleton variant="circular" width={40} height={40} />
                        </Col>
                        <Col lg="10" md="10" sm="10" className="ml-3">
                          <h6 className="history-title" style={{ fontSize: "0.9rem" }}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          </h6>
                          <p style={{ fontSize: "0.9rem" }}>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                          </p>{" "}
                        </Col>
                        <Col
                          lg="1"
                          md="1"
                          sm="1"
                          className=" d-flex align-items-center"
                        >
                        </Col>
                      </Col>
                    </> :
                    <>
                      <Col lg={5} className="mt-1 p-3  d-flex pb-4 border-right">
                        <Col lg="1" md="1" sm="1" className=" d-flex align-items-center justify-content-center">
                          <Avatar className="next-sync_avatar">
                            <SyncIcon />
                          </Avatar>
                        </Col>
                        <Col lg="10" md="10" sm="10" className="ml-3">
                          <h6 className="history-title" style={{ fontSize: "0.9rem" }}>
                            {t("ultimo-sync")}
                          </h6>
                          <p style={{ fontSize: "0.9rem" }}>
                            {lastSync.data.data.date}
                          </p>{" "}
                        </Col>
                        <Col
                          lg="1"
                          md="1"
                          sm="1"
                          className=" d-flex align-items-center"
                        >
                        </Col>
                      </Col>
                      <Col lg={5}
                        className="mt-1 p-3  d-flex pb-4"
                      >
                        <Col
                          lg="1"
                          md="1"
                          sm="1"
                          className=" d-flex align-items-center justify-content-center"
                        >
                          <Avatar className="next-sync">
                            <UpdateIcon />
                          </Avatar>
                        </Col>
                        <Col lg="10" md="10" sm="10" className="ml-3">
                          <h6 className="history-title" style={{ fontSize: "0.9rem" }}>
                            {t("proximo-sync")}
                          </h6>
                          <p style={{ fontSize: "0.9rem" }}>
                            {nextSync.data.data.date}
                          </p>{" "}
                        </Col>
                        <Col
                          lg="1"
                          md="1"
                          sm="1"
                          className=" d-flex align-items-center"
                        >
                        </Col>
                      </Col>
                    </>
                }
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="w-100 py-4 mx-0">
        <Col xs={12} className="px-0">
          <EnhancedTable emails={emails} loader={loadEmails} refetch={refetch} setRefetch={setRefetch} />
        </Col>
      </Row>
    </Container>
  );
};

export default CMAMHome;
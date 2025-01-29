import { Container, Row, Col, Card, CardHeader, CardBody, FormInput } from "shards-react";
import Button from '@mui/material/Button';
import { useTranslation } from "react-i18next";
import SyncIcon from '@mui/icons-material/Sync';
import { Avatar, CircularProgress, Skeleton } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import { BASE_URL, requestHeader, useFetch } from "../../../../hooks/useFetch";
import axios from "axios";
import { ErrorPage } from "../../../../pages/error";
import { LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TablePaginationDemo } from "../../../../components/commons/pagination/Pagination";
import Table from "../../../../components/commons/table/Table";
import { base64Enconder } from "../../../../utils/services/base64Enconder";
import fields from "../../../../utils/commons/fields.json"
import { successMsg, errorMsg, ToastNotification, infoMsg } from "../../../../components/commons/notification/ToastNotification";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";

const Configuracoes = () => {
    const { t } = useTranslation();
    const [loadSync, setLoadSync] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [instanceData, setInstanceData] = useState({})
    const [loadNewInstance, setLoadNewInstance] = useState(false);
    const [instancias, setInstancias] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [refetch, setRefetch] = useState(false);
    const syncs = useFetch(`api/mfl/syncs/nextExecutions`)

    console.log(syncs)
    const getInstancias = async () => {
        setIsFetching(true)
        await axios.get(`${BASE_URL}/api/mfl/syncs/servers`, requestHeader())
            .then(response => {
                setInstancias(response.data)
            })
        setIsFetching(false)
    }

    useEffect(() => {
        getInstancias()
    }, [refetch])

    const fetch = async (endpoint, body) => {
        return await axios.post(`${BASE_URL}${endpoint}`, body, requestHeader())
            .then((response) => {
                return response
            })
    }

    async function SyncNow() {
        setLoadSync(true)
        let response = await fetch('/api/mfl/syncs/run', {})
        if (response) {
            if (response.data.status == 200) successMsg(response.data.message)
            else errorMsg("Erro!")

            setLoadSync(false)
        }
    }

    async function CreateNewInstance() {
        if (instanceData.username && instanceData.password && instanceData.name && instanceData.url) {
            setLoadNewInstance(true)
            let obj = { ...instanceData, auth: base64Enconder(instanceData.username, instanceData.password), isMaster: false }
            delete obj.password
            delete obj.username

            let response = await fetch("/api/mfl/syncs/servers", obj)
            if (response) {
                if (response.data.status == 201) successMsg(response.data.message)
                else errorMsg("Erro!")

                setLoadNewInstance(false)
                setRefetch(true)
            }
        } else infoMsg("Por favor preencha todos os campos")
    }

    if (error) {
        return <ErrorPage />
    }

    function fieldEvent(val, field) {
        setInstanceData(instanceData => ({ ...instanceData, [field]: val }))
    }

    if (error) {
        return (
            <ErrorPage />
        )
    }

    const tableColums = () => {
        return ['#', 'Nome', 'URL', 'Tabela Mestre'];
    }

    const tableData = () => {
        const events = [];

        if (instancias.servers) {
            for (const event of instancias.servers) {
                events.push([event.id, event.name, event.url, event.isMaster ? "Sim" : "Não"])
            }
        }

        return events
    }

    //TODO uncoment code
    return (
        <Container fluid className="main-content-container px-4">
            <Row className="w-100 pt-4 mx-0">
                <Col xs={12} className="px-0">
                    <Card>
                        <CardBody className='px-5'>
                            <Row className="w-100 mx-0 px-0">
                                {
                                    syncs.isFetching ?
                                        <>

                                            <Col lg={4} className="mt-1 p-3  d-flex pb-4">
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center justify-content-center" >
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
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center"> </Col>
                                            </Col>
                                            <Col lg={4} className="mt-1 p-3  d-flex pb-4">
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center justify-content-center" >
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
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center"></Col>
                                            </Col>
                                            <Col lg={4} className="mt-1 p-3  d-flex pb-4">
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center justify-content-center" >
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
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center"></Col>
                                            </Col>
                                        </> :
                                        <>
                                            <Col lg={4} className="mt-1 p-3  d-flex pb-4 border-right">
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
                                                        {/* {new Date(syncs.data[0].lastExecution).toUTCString()} */}
                                                    </p>{" "}
                                                </Col>
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center"> </Col>
                                            </Col>
                                            <Col lg={4} className="mt-1 p-3  d-flex pb-4 border-right">
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center justify-content-center">
                                                    <Avatar className="next-sync">
                                                        <UpdateIcon />
                                                    </Avatar>
                                                </Col>
                                                <Col lg="10" md="10" sm="10" className="ml-3">
                                                    <h6 className="history-title" style={{ fontSize: "0.9rem" }}>
                                                        {t("proximo-sync")}
                                                    </h6>
                                                    <p style={{ fontSize: "0.9rem" }}>
                                                        {/* {new Date(syncs.data[0].nextExecution).toUTCString()} */}
                                                    </p>{" "}
                                                </Col>
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center"> </Col>
                                            </Col>
                                            <Col sm={4} className="mt-1 p-3  d-flex pb-4">
                                                <Col lg="10" md="10" sm="10" className="ml-3">
                                                    <Button onClick={() => { SyncNow() }} style={{ margin: "10px 0 0 10px" }} size="small" variant="outlined" >
                                                        {loadSync ?
                                                            < CircularProgress size={"19px"} /> :
                                                            t("sync-now")}
                                                    </Button>
                                                </Col>
                                                <Col lg="1" md="1" sm="1" className=" d-flex align-items-center"> </Col>
                                            </Col>
                                        </>
                                }
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className="w-100 py-4 mx-0">
                <Card style={{ width: "100%" }} >
                    <CardBody>
                        <h6 className="history-title" style={{ fontSize: "0.9rem", margin: "-10px 0 5px 0" }}>
                            {t("nova-instancia")}
                        </h6>
                        <div style={{ display: "flex" }} >
                            {fields.map((val) =>
                                <FormInput onChange={(event) => { fieldEvent(event.target.value, val.name) }} type={val.type} placeholder={val.name} className="mb-2 mr-2" />
                            )}
                            <Button onClick={CreateNewInstance} style={{ height: "35.5px" }} size="small" variant="outlined" >
                                {loadNewInstance ? < CircularProgress size={"19px"} /> :
                                    t("salvar")}
                            </Button>
                        </div>
                    </CardBody>
                </Card>

                <Card style={{ width: "100%", marginTop: "15px" }} >
                    <CardHeader className="border-bottom">
                        <h6 className="m-0 mb-1">Instâncias DHIS2</h6>
                    </CardHeader>
                    {isFetching && <LinearProgress />}
                    <CardBody className="p-0 pb-3">
                        <Table fetching={false} isFetching={isFetching} error={error} tableColumns={tableColums} tableData={tableData} />
                    </CardBody>
                    {isFetching === false && <TablePaginationDemo totalPages={instancias} setCurrentPage={setCurrentPage} currentPage={currentPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} />}
                </Card>
            </Row>
            <ToastNotification />
        </Container >
    );
};

export default Configuracoes;

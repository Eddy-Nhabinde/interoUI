import React from 'react'
import { ModalBody } from 'shards-react'
import { Divider, LinearProgress } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFetch } from '../../../hooks/useFetch';
import Dialog from '@mui/material/Dialog'

function getComponentContent(data, component, detailsData) {
    const { t } = useTranslation();

    switch (component) {
        case "Details":

            return (
                <ModalBody>
                    <div style={{ minWidth: "50vw" }} >
                        <h5 className='mb-1'>{t("detalhes-gerais")}</h5>
                        {detailsData.length == 0 && <LinearProgress />}
                        <article className='mb-3'>
                            <blockquote >
                                <span>Status: </span ><p style={{ color: detailsData[7] == 'ERROR' ? "#F44E3F" : "#63D471" }} >{detailsData[7]}</p>
                            </blockquote>
                            <blockquote>
                                <span>{t("data")}: </span><p>{detailsData[0]}</p>
                            </blockquote>
                            <blockquote>
                                <span>{t("servidor")}: </span><p>{detailsData[1]}</p>
                            </blockquote>
                            <blockquote>
                                <span>URL: </span><p>{detailsData[2]}</p>
                            </blockquote>
                        </article>

                        <h5 className='mb-1'>{t("import-detalhes")}</h5>
                        <Divider />
                        <article className='mt-2'>
                            <div className='mt-3'>
                                <Row>
                                    <Col xs={6} className="pr-1">
                                        <div className='w-100  imported py-2 d-flex justify-content-center align-items-center'>
                                            <div className='import-details'>
                                                <p>{t("criado")}</p>
                                                <span>{detailsData[3]}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={6} className="pl-1">
                                        <div className='w-100  updated py-2 d-flex justify-content-center align-items-center'>
                                            <div className='import-details'>
                                                <p>{t("actualizados")}</p>
                                                <span>{detailsData[4]}</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row className='mt-2'>
                                    <Col xs={6} className="pr-1">
                                        <div className='w-100  ignored py-2 d-flex justify-content-center align-items-center'>
                                            <div className='import-details'>
                                                <p>{t("ignorados")}</p>
                                                <span>{detailsData[6]}</span>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={6} className="pl-1">
                                        <div className='w-100  deleted py-2 d-flex justify-content-center align-items-center'>
                                            <div className='import-details'>
                                                <p>{t("apagados")}</p>
                                                <span>{detailsData[5]}</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </article>
                    </div>
                </ModalBody>
            )

        case "Default":
            const details = JSON.parse(data.details)

            return (
                <ModalBody>
                    <h5 className='mb-1'>{t("detalhes-gerais")}</h5>
                    <Divider />
                    <article className='mb-3 mt-2'>
                        <div className='d-flex'>
                            <span className='mr-2'>{t("utilizador")}</span><p>{data.username || "---"}</p>
                            <div className='mx-3' />
                            <span className='mr-2'>{t("estado")}</span><p style={{ color: data.status === "ERROR" ? "red" : data.status === "WARNING" && "orange" }}>{data.status || "---"}</p>
                            <div className='mx-3' />
                            <span className='mr-2'>{t("criado")}</span><p>{data.created_at || "---"}</p>
                        </div>
                    </article>

                    <article className='mb-3'>
                        <blockquote>
                            <span>{t("periodos")}: </span><p>{details.periods}</p>
                        </blockquote>
                        <blockquote>
                            <span>{t("unidades-sanitarias")}: </span><p>{details.numOrgUnits}</p>
                        </blockquote>
                        <blockquote>
                            <span>{t("variaveis")}: </span><p>{details.numVariables}</p>
                        </blockquote>
                    </article>


                    <h5 className='mb-1'>{t("import-detalhes")}</h5>
                    <Divider />
                    <article className='mt-2'>
                        <div className='d-flex'>
                            <span className='mr-2'>{t("import-tipo")}</span><p>{data.importType || "---"}</p>
                            <div className='mx-3' />
                            <span className='mr-2'>{t("import-data")}</span><p >{data.importDate || "---"}</p>
                        </div>
                        <div className='mt-3'>
                            <Row>
                                <Col xs={6} className="pr-1">
                                    <div className='w-100  imported py-2 d-flex justify-content-center align-items-center'>
                                        <div className='import-details'>
                                            <p>{t("importados")}</p>
                                            <span>{data.imported}</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6} className="pl-1">
                                    <div className='w-100  updated py-2 d-flex justify-content-center align-items-center'>
                                        <div className='import-details'>
                                            <p>{t("actualizados")}</p>
                                            <span>{data.updated}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className='mt-2'>
                                <Col xs={6} className="pr-1">
                                    <div className='w-100  ignored py-2 d-flex justify-content-center align-items-center'>
                                        <div className='import-details'>
                                            <p>{t("ignorados")}</p>
                                            <span>{data.ignored}</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6} className="pl-1">
                                    <div className='w-100  deleted py-2 d-flex justify-content-center align-items-center'>
                                        <div className='import-details'>
                                            <p>{t("deletados")}</p>
                                            <span>{data.deleted}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </article>
                </ModalBody>
            )
    }
}

const ModalDialog = ({ open, setOpen, data, component, id }) => {
    let details = null
    const detailsData = []

    if (component == 'Details')
        details = useFetch(`/api/mfl/syncs/${id}`)

    if (details)
        if (details.data)
            detailsData.push(details.data[0].date, details.data[0].serverName, details.data[0].serverUrl, details.data[0].created || 0, details.data[0].deleted || 0, details.data[0].updated || 0, details.data[0].ignored || 0, details.data[0].status)

    console.log(detailsData)
    return (
        <Dialog
            open={open}
            maxWidth="lg"
            onClose={() => setOpen(false)}
            style={{ marginTop: "-20%" }}
        >
            {getComponentContent(data, component, detailsData)}
        </Dialog>
    )
}

export { ModalDialog }
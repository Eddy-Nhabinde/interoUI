import { Divider, LinearProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Row } from 'shards-react'
import { BASE_URL, requestHeader, useFetch } from '../../../../hooks/useFetch'
import { GenericForm } from '../../../mflInternal/components/form/GenericForm'
import { variables } from '../../data/suggestionFormVariable'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { errorMsg, successMsg, ToastNotification } from '../../../../components/commons/notification/ToastNotification'

const CreateSuggestion = () => {
    const param = useParams();
    const formType = param.type;
    const [formInputs, setFormInputs] = useState({});
    const [error, setError] = useState(null);
    const [savedSuccess, setSacedSuccess] = useState(null);
    const [loading, setLoading] = useState(false);


    const provinces = useFetch("api/mfl/suggestions/orgUnits?level=province");
    const district = useFetch(`api/mfl/suggestions/orgUnits?parent=${formInputs["province"]}&level=district`);
    const ou = useFetch(`api/mfl/suggestions/orgUnits?parent=${formInputs["district"]}&level=facility`);
    const classifications = useFetch("api/mfl/healthFacilityClassifications?paging=false");

    console.log(ou)

    const getFomInputs = ({ target: { id, value } }) => {
        setFormInputs({ ...formInputs, [id]: value });
    };

    useEffect(() => {
        if (formInputs['ou']) {
            console.log(ou.data.organisationUnits.filter((element) => {
                return element.orgUnitId === formInputs["ou"]
            }))
            const name = ou.data.organisationUnits.filter((element) => {
                return element.orgUnitId === formInputs["ou"]
            })[0].name

            setFormInputs(prevState => ({
                ...prevState,
                "name": name,
                "shortName": ou.data.organisationUnits.filter((element) => {
                    return element.orgUnitId === formInputs["ou"]
                })[0].shortName
            }))
        }
    }, [formInputs['ou']])

    const onSubmit = (event) => {
        event.preventDefault();
        const form = {
            "orgUnitId": formInputs["ou"] || null,
            "name": formInputs["name"],
            "code": formInputs["code"],
            "shortName": formInputs["shortName"],
            "openingDate": "1970-01-01",
            "province": formInputs["province"],
            "featuretype": "NONE",
            "parent": formInputs["district"],
            "healthFacilityType": "wE5fCFwCEqM",
            "healthFacilityClassification": formInputs["classification"],
            "healthFacilityLevel": "MkjOXUQegjc",
            "userId": null,
            "username": null,
            "type": formType === "update-suggestion" ? "UPDATE" : "CREATE",
            "proposerName": formInputs["requente"],
            "proposerEmail": formInputs["email"],
            "proposerPhone": formInputs["phone"]
        }
        console.log(form)

        setLoading(true)
        axios.post(`${BASE_URL}/api/mfl/suggestions`, form, requestHeader())
            .then(resp => {
                console.log(resp)
                successMsg(resp.data.message)
                setSacedSuccess(resp.data.message)
                setLoading(false)
            }).catch(error => {
                console.log(error.message)
                setError(error.message)
                setLoading(false)
                errorMsg(error.message);
            })
    }

    return (
        <Container fluid className="main-content-container px-4">
            <Row>
                <Col md={12} lg={12} xl={7}>
                    <Card small className="my-5">
                        <div className="d-flex p-3 justify-content-between">
                            <h5 className="m-0 mb-4">Detalhes da Unidade Sanitária</h5>
                        </div>
                        {(district.isFetching || provinces.isFetching || classifications.isFetching || ou.isFetching) ? <LinearProgress /> :
                            <Form onSubmit={onSubmit}>
                                <CardBody className="px-0 pb-3 w-100">
                                    <Row>
                                        {variables(
                                            {
                                                cfts: classifications.data.healthFacilityClassifications,
                                                provinces: provinces.data.organisationUnits,
                                                district: district.data.organisationUnits,
                                                facility: ou.data.organisationUnits
                                            }, formType
                                        ).map((variable, index) => (
                                            <Col xs={12}>
                                                <GenericForm
                                                    size="md"
                                                    required
                                                    value={formInputs[variable.id]}
                                                    disabled={false}
                                                    onChange={(event) => getFomInputs(event)}
                                                    inputType={
                                                        variable.valueType === "PHONE_NUMBER"
                                                            ? "number"
                                                            : variable.valueType
                                                    }
                                                    id={index}
                                                    col="col-lg-12 mb-3 mt-2"
                                                    title={variable.title}
                                                    {...variable}
                                                />
                                                {
                                                    variable.id === "classification" &&
                                                    <div className='mt-5'>
                                                        <Divider />
                                                    </div>
                                                }
                                            </Col>
                                        ))}
                                    </Row>
                                </CardBody>
                                {loading && <LinearProgress />}
                                <CardFooter className='d-flex justify-content-between'>
                                    <div></div>
                                    <div className="d-felx">
                                        <Button disabled={loading} type="button" style={{ width: "auto", height: "34.8px", marginRight: "10px", color: "#000", backgroundColor: "#EFB4B4" }} theme="danger" outline>Limpar campos</Button>
                                        <Button disabled={loading} type="submit" style={{ width: "100px", height: "34.8px", color: "#000", backgroundColor: "#C3DBC4" }} theme="success" outline>Salvar</Button>
                                    </div>
                                </CardFooter>
                            </Form>
                        }
                    </Card>
                    {(error) &&
                        <ToastNotification />
                    }
                    {
                        savedSuccess &&
                        <ToastNotification />
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default CreateSuggestion
import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Form, CardFooter, Button } from "shards-react";
import { BASE_URL, requestHeader, useFetch } from "../../../../hooks/useFetch";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/styles/history.css";
import { GenericForm } from "../../components/form/GenericForm";
import { variables } from "../../data/orgUnitForm";
import { FormUserInfo } from "../../components/FormUserInfo";
import { LinearProgress } from "@mui/material";
import { ToastNotification, errorMsg, successMsg } from '../../../../components/commons/notification/ToastNotification';
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { ErrorPage } from "../../../../pages/error";

const SuggestionsDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { t } = useTranslation();
  const history = useHistory();
  const [provinceId, setProvinceId] = useState(params.get("province") || "");
  const [formInputs, setFormInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const parameter = useParams();
  const { auth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [savedSuccess, setSacedSuccess] = useState(null);


  const suggestion = useFetch(`api/mfl/suggestions/${parameter.id}`);
  const provinces = useFetch("api/mfl/suggestions/orgUnits?level=province");
  const district = useFetch(`api/mfl/suggestions/orgUnits?parent=${formInputs["province"] || (suggestion.data && suggestion.data.province)}&level=district`);
  const classifications = useFetch("api/mfl/healthFacilityClassifications?paging=false");

  const onSubmit = (status) => {
    const form = {
      "id": parameter.id,
      "status": status,
      "dhisData": {
        "orgUnitId": suggestion.data.orgUnitId || null,
        "name": formInputs['name'],
        "code": formInputs['code'],
        "shortName": suggestion.data.shortName,
        "openingDate": suggestion.data.openingDate,
        "featuretype": "NONE",
        "province": formInputs['province'],
        "parent": formInputs['district'],
        "healthFacilityType": suggestion.data.healthFacilityType,
        "healthFacilityClassification": suggestion.data.healthFacilityClassification,
        "healthFacilityLevel": suggestion.data.healthFacilityLevel,
        "userId": auth.userId,
        "username": auth.username,
        "type": suggestion.data.type,
        "proposerName": suggestion.data.proposerName,
        "proposerEmail": suggestion.data.proposerEmail,
        "proposerPhone": suggestion.data.proposerPhone
      }
    }

    setLoading(true)
    axios.put(`${BASE_URL}/api/mfl/suggestions/${parameter.id}`, form, requestHeader())
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

  useEffect(() => {
    if (suggestion.data)
      setFormInputs({
        "name": suggestion.data.name,
        "code": suggestion.data.code,
        "classification": suggestion.data.healthFacilityClassification,
        "province": suggestion.data.province,
        "district": suggestion.data.parent
      })
  }, [suggestion.data])

  const getFomInputs = ({ target: { id, value } }) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  if (provinces.error || suggestion.error || classifications.error) {
    console.log(provinces.error, suggestion.error, classifications.error)
    return <ErrorPage />
  }

  console.log(suggestion)

  return (
    <Container fluid className="main-content-container px-4">
      <Row>
        <Col md={12} lg={7}>
          <Card small className="my-5">
            <div className="d-flex p-3 justify-content-between">
              <h5 className="m-0 mb-4">Detalhes da Unidade Sanitária</h5>
              <div className="card__header-type-label">
                {suggestion.isFetching === false && (
                  suggestion.data.status === "PENDENT" ? <div className="m-0 type__status-label" style={{ backgroundColor: (suggestion.isFetching === false) && (suggestion.data.type === "CREATE" ? "#45b775" : suggestion.data.type === "UPDATE" && "orange"), textTransform: "lowercase" }}>
                    {<span>{suggestion.data.type}</span>}
                  </div> :
                    <div className="m-0 type__status-label" style={{ backgroundColor: (suggestion.isFetching === false) && (suggestion.data.status === "APPROVED" ? "#C3DBC4" : suggestion.data.status === "UNAPPROVED" && "#EFB4B4"), textTransform: "lowercase" }}>
                      {<span>{suggestion.data.status}</span>}
                    </div>
                )}
              </div>
            </div>
            {(suggestion.isFetching || district.isFetching || provinces.isFetching || classifications.isFetching) ? <LinearProgress /> :
              <Form>
                <CardBody className="px-0 pb-3 w-100">
                  <Row>
                    {variables({
                      cfts: classifications.data.healthFacilityClassifications,
                      provinces: provinces.data.organisationUnits,
                      district: district.data.organisationUnits
                    }).map((variable, index) => (
                      <Col xs={12}>
                        <GenericForm
                          size="md"
                          required
                          value={formInputs[variable.id]}
                          disabled={suggestion.data.status !== "PENDENT"}
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
                      </Col>
                    ))}
                  </Row>
                </CardBody>
                {loading && <LinearProgress />}
                <CardFooter className='d-flex justify-content-between'>
                  <Button onClick={() => history.goBack()} type='button' style={{ width: "100px", height: "34.8px" }} outline>Voltar</Button>
                  {suggestion.data.status === "PENDENT" && <div className="d-felx">
                    <Button disabled={loading} onClick={e => onSubmit("UNAPPROVED")} type="submit" style={{ width: "100px", height: "34.8px", marginRight: "10px", color: "#000", backgroundColor: "#EFB4B4" }} theme="danger" outline>Rejeitar</Button>
                    <Button disabled={loading} onClick={e => onSubmit("APPROVED")} type="submit" style={{ width: "100px", height: "34.8px", color: "#000", backgroundColor: "#C3DBC4" }} theme="success" outline>Aprovar</Button>
                  </div>}
                </CardFooter>
              </Form>
            }
          </Card>
        </Col>
        <Col md={12} lg={5}>
          <Card small className="my-5" style={{ height: "633px" }}>
            <div className="p-3">
              <h5>Detalhes do Emissor</h5>
            </div>
            {suggestion.isFetching ? <LinearProgress /> :
              <CardBody className="p-3">
                <FormUserInfo varKey="Nome Completo:" varValue={suggestion.data.proposerName} />
                <FormUserInfo varKey="Telefone:" varValue={suggestion.data.proposerPhone || "---"} />
                <FormUserInfo varKey="E-mail:" varValue={suggestion.data.proposerEmail} />
                <FormUserInfo varKey="Data da submissão:" varValue={suggestion.data.created_at} />
              </CardBody>
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
  );
};

export default SuggestionsDetails;

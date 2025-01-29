import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";
import { useFetch } from "../../../../hooks/useFetch";
import { LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../../../pages/error";
import Map from "../../components/map/map";
import Details from "../../utils/loadDetails";

const FacilityDetails = () => {
  const { id } = useParams();

  const { data, error, isFetching } = useFetch(
    `/api/mfl/orgUnits?id=${id}`
  );

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Container fluid className="main-content-container px-4 py-4">
      <Row className="mt-4">
        <Col lg="6" md="6" sm="6" className="mb-4">
          <Card className="">
            <CardHeader className="border-bottom d-flex">
              <h5 className="my-0 ml-0 mr-auto text-dark">
                Dados da Unidade Sanitária
              </h5>
            </CardHeader>
            {isFetching && <LinearProgress />}
            <CardBody className=" py-3">
              <Details
                data={
                  data && data.organisationUnits && data.organisationUnits[0]
                }
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="6" className="mb-4">
          <CardHeader className="border-bottom d-flex">
            <h6 className="my-0 ml-0 mr-auto text-dark">Localização no mapa</h6>
            <span
              className="text-danger"
              hidden={
                isFetching ||
                (data &&
                  data.organisationUnits &&
                  data.organisationUnits[0].Geometry)
              }
            >
              Sem coordenadas disponíveis
            </span>
          </CardHeader>
          {isFetching && <LinearProgress />}
          <Map
            container={"mapDetails"}
            tittle={"Localização"}
            coordinates={data && data.organisationUnits}
            zoom={5}
            legend={true}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FacilityDetails;

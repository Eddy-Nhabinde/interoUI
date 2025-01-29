import React from "react";
import { Container, Col } from "shards-react";
import { useParams } from 'react-router-dom'
import { modules } from '../../../../modules/modulesContent'
import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

export default () => {
  const { module } = useParams()
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width: 550px)')

  const getModuleTitle = () => {
    return modules.filter(element => {
      return element.route === module;
    })[0].displayName
  }


  return (
    <Container>
      <Col>
        {!matches && <h5 style={{width: 500}}>{(module && getModuleTitle()) || t("pagina-inicial")}</h5>}
      </Col>
    </Container>
  )
};

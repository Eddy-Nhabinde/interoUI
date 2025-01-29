import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row } from "shards-react";
import { ModuleCard } from "../../components/commons/card/ModuleCard";
import { AuthContext } from "../../context/AuthProvider";
import { modules } from "../../modules/modulesContent";
import ukwaba from "../../assets/images/ukwaba-logo.png";

const  Home = () => {
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Container fluid className="main-content-container">
    
    <div className="w-100 mt-5">
        <div className="text-center col-lg-12">
         
          <p className="h4 mb-3  ">
          {t("ukwaba_welcome")}
          </p>
          <span className="h5">
            {" "}
            {t("seleccionar_modulo")}
          </span>
        </div>
      <Row className="w-100 mt-5 mx-4 d-flex justify-content-center">
        {modules.map(
          (module, index) =>
            auth &&
            auth.roles.includes(module.necessaryRole) && (
              <ModuleCard module={module} />
            )
        )}
      </Row>
      </div>
    </Container>
  );
};

export default Home;

import React, { useContext } from "react";
import { Button, Nav } from "shards-react";
import SidebarNavItem from "./SidebarNavItem";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { AuthContext } from "../../../../context/AuthProvider";

const SidebarNavItems = () => {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);
  const { module } = useParams();
  const history = useHistory()

  const sidebarItems = () => {
    switch (module) {
      case "covid":
        return [
          {
            title: t("pagina_inicial"),
            to: `/covid/covid-home`,
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
          {
            title: t("local"),
            htmlBefore: '<i class="material-icons">place</i>',
            to: `/covid/report-site`,
          },
          {
            title: t("utilizadores"),
            htmlBefore: '<i class="material-icons">people_alt</i>',
            to: `/covid/report-user`,
          },
          {
            title: t("historico"),
            htmlBefore: '<i class="material-icons">format_list_bulleted</i>',
            to: `/covid/covid-linelist`,
          },
        ];
      case "cmam":
        return [
          // {
          //   title: t("pagina_inicial"),
          //   to: '/cmam/cmam-home',
          //   htmlBefore: '<i class="material-icons">dashboard</i>',

          // },
          {
            title: t("historico"),
            htmlBefore: '<i class="material-icons">format_list_bulleted</i>',
            to: "/cmam/cmam-home",
          },
          {
            title: t("prod_pagina"),
            htmlBefore: '<i class="material-icons">bubble_chart</i>',
            to: "/cmam/product",
          },
          {
            title: t("us"),
            htmlBefore: '<i class="material-icons">business</i>',
            to: "/cmam/orgunit",
          },
          {
            title: t("config_pagina"),
            htmlBefore: '<i class="material-icons">settings</i>',
            to: "/cmam/settings",
          },
        ];
      case "sircev":
        return [
          {
            title: t("pagina_inicial"),
            to: "/sircev/sircev-home",
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
          {
            title: t("historico"),
            htmlBefore: '<i class="material-icons">format_list_bulleted</i>',
            to: "/sircev/sircev-linelist",
          },
        ];
      case "umm":
        return [
          {
            title: "Dashboard",
            to: "/umm/umm-home",
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
          {
            title: "Users",
            to: "/umm/umm-linelist",
            htmlBefore: '<i class="material-icons">people</i>',
          },
        ];
      case "mfl":
        return [
          {
            title: "Dashboard",
            to: "/mfl/mfl-home",
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
          {
            title: t("us"),
            to: "/mfl/orgunits",
            htmlBefore: '<i class="material-icons">business</i>',
          },
          ...(auth ? [{
            title: t("api-doc"),
            to: "/mfl/api-documentation",
            htmlBefore: '<i class="material-icons">local_library</i>',
          }] : []),
          {
            title: t("historico"),
            htmlBefore: '<i class="material-icons">format_list_bulleted</i>',
            to: "/mfl/mfl-history",
          },
        ];
      case "mfl-internal":
        return [
          {
            title: "Lista Mestre de USs",
            to: "/mfl-internal/mfl-internal-home",
            htmlBefore: '<i class="material-icons">location_city</i>',
          },
          {
            title: "Histórico Linear",
            to: "/mfl-internal/linelist",
            htmlBefore: '<i class="material-icons">format_list_bulleted</i>',
          },
          {
            title: "Sugestões",
            to: "/mfl-internal/suggestions",
            htmlBefore: '<i class="material-icons">local_library</i>',
          },
        ];
      case "sus":
        return [
          {
            title: "Inicio",
            to: "/sus/sus-home",
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
          {
            title: "Histórico Linear",
            to: "/sus/sus-linelist",
            htmlBefore: '<i class="material-icons">format_list_bulleted</i>',
          },
          {
            title: t("config_pagina"),
            htmlBefore: '<i class="material-icons">settings</i>',
            to: "/sus/sus-settings",
          },
        ];
      case "imd-vbg":
        return [
          {
            title: "Inicio",
            to: "/imd-vbg/imd-home",
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
        ];
      case "siim":
        return [
          {
            title: "Inicio",
            to: "/siim/siim-home",
            htmlBefore: '<i class="material-icons">dashboard</i>',
          },
        ];
      default:
        return [
          {
            title: t("modulo"),
            to: "/home",
            htmlBefore: '<i class="material-icons">apps</i>',
          },
          {
            title: t("doc"),
            to: "/documentation",
            htmlBefore: '<i class="material-icons">local_library</i>',
          },
        ];
    }
  };

  const home = () => {
    return {
      title: t("pagina-inicial"),
      to: `/home`,
      htmlBefore: '<i class="material-icons">home</i>',
    };
  };

  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column" style={{ height: "95%" }}>
        {sidebarItems().map((item, idx) => (

          <SidebarNavItem key={idx} item={item} />
        ))}
        {
          module === "mfl" && auth && <div className="my-auto px-3 w-100 h-auto">
            <div className="mfl__external--suggest text-center">
              <span className="mfl__external--suggest-title">{t("nova-sugestao")}<LightbulbIcon style={{ color: "#ffb400" }} /></span>
              <div className="mt-3 w-100">
                <Button onClick={() => history.push(`/mfl/suggestion/creation-suggestion`)} className="mb-2 w-100">
                  {t("criacao")}
                </Button><br />
                <Button onClick={() => history.push(`/mfl/suggestion/update-suggestion`)} className="w-100">
                  {t("actualizacao")}
                </Button>
              </div>
            </div>
          </div>
        }
        {module && auth && <SidebarNavItem marginTop="mt-auto" item={home()} />}
      </Nav>
    </div>
  );
};

export default SidebarNavItems;

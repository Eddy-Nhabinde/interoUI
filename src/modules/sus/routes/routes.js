import React from "react";
import { RequiredAuth } from "../../../utils/auth/RequiredAuth";
import { DefaultLayout } from "../../../components/layout/defaultLayout/index";
import { SusHome } from "../pages/home";
import { SusLineList } from "../pages/lineList";
import { Configuracoes } from "../pages/instancias";

const routes = () => [
    {
        path: "/:module/sus-home",
        layout: DefaultLayout,
        component: () => (
            <RequiredAuth allowedRoles={["monitoring_sircev"]}>
                <SusHome />
            </RequiredAuth>
        ),
    },
    {
        path: "/:module/sus-linelist",
        layout: DefaultLayout,
        component: () => (
            <RequiredAuth allowedRoles={["monitoring_sircev"]}>
                <SusLineList />
            </RequiredAuth>
        ),
    },
    {
        path: "/:module/sus-settings",
        layout: DefaultLayout,
        component: () => (
            <RequiredAuth allowedRoles={["monitoring_sircev"]}>
                <Configuracoes />
            </RequiredAuth>
        ),
    }
];
export { routes };

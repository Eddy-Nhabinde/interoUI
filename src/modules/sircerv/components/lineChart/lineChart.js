import { Options } from "./options"
import { formatData } from "../../utils/commons/formatChartData"
import React from "react";
import ReactEcharts from "echarts-for-react"
import { Card, CardHeader, CardBody } from "shards-react";
import { useTranslation } from "react-i18next";

function LineChart({ data }) {
    const { dados, yAxis } = formatData(data)
    const { options } = Options(dados, yAxis)
    const { t } = useTranslation();

    return (
        <Card small className="h-100">
            <CardHeader className="border-bottom d-flex">
                <h6 className="my-0 ml-0 mr-auto">{t("emissoes_ao_longo_do_tempo")}</h6>
            </CardHeader>
            <CardBody className="pt-0">
                {
                    dados.length > 0 ?
                        <ReactEcharts
                            option={options}
                            style={{ width: "100%", height: "400px" }}
                        >
                        </ReactEcharts>
                        :
                        <div style={{ padding: "15px" }} >
                            Sem registos nos ultimos 30 dias
                        </div>
                }
            </CardBody>
        </Card>
    )
}

export default LineChart

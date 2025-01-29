import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import Chart from "./lineChartHelper";
import { useTranslation } from "react-i18next";
import { ChartDownloader } from "./chartDownloader/ChartDownloader";

const LineChartHome = ({ prints, data, date }) => {

  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const [chartInstace, setChartInstance] = useState(null);

  const getPrints = () => {
    if (prints) {
      return {
        labels: Array.from(
          new Array(prints.data.length),
          (_, i) => (date === 'data' ? prints.data[i].data : prints.data[i].date)),
        datasets: [
          {
            label: t("certificados_emitidos"),
            fill: "start",
            data: Array.from(
              new Array(prints.data.length),
              (_, i) => (data === 'prints' ? prints.data[i].prints : prints.data[i].imports)),
            backgroundColor: "rgba(0,123,255,0.1)",
            borderColor: "rgba(0,123,255,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3,
          },
        ],
      };
    }
    return []
  };


  const chartOptions = {
    ...{
      responsive: true,
      legend: {
        position: "top",
      },
      elements: {
        line: {
          // A higher value makes the line look skewed at this ratio.
          tension: 0.3,
        },
        point: {
          radius: 0,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: false,
            ticks: {
              callback(tick, index) {
                // Jump every 7 values on the X axis labels to avoid clutter.
                return index % 7 !== 0 ? "" : tick;
              },
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              suggestedMax: 45,
              callback(tick) {
                if (tick === 0) {
                  return tick;
                }
                // Format the amounts using Ks for thousands.
                return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
              },
            },
          },
        ],
      },
      hover: {
        mode: "nearest",
        intersect: false,
      },
      tooltips: {
        custom: false,
        mode: "nearest",
        intersect: false,
      },
    },
  };

  useEffect(() => {
    if (prints && prints.data.length > 0) {
      if (!chartInstace) {
        var chart = new Chart(canvasRef.current, {
          type: "LineWithLine",
          data: getPrints(),
          options: chartOptions,
        });

        const buoMeta = chart.getDatasetMeta(0);
        buoMeta.data[0]._model.radius = 0;
        buoMeta.data[getPrints().datasets[0].data.length - 1]._model.radius = 0;
        chart.render();
        setChartInstance(chart);
      } else {
        chartInstace.data = getPrints();
        chartInstace.update();
        chartInstace.render();
      }
    }
  }, [prints, t])

  return (
    <Card small className="h-100">
      <CardHeader className="border-bottom d-flex">
        <h6 className="my-0 ml-0 mr-auto">{t("emissoes_ao_longo_do_tempo")}</h6><ChartDownloader chartInstance={chartInstace} />
      </CardHeader>
      <CardBody className="pt-0">
        <canvas
          height="120"
          ref={canvasRef}
          style={{ maxWidth: "100% !important" }}
        />
      </CardBody>
    </Card>
  );
};
export default LineChartHome;
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "shards-react";
import { LinearProgress } from "@mui/material";
import "../../../../assets/styles/chart.css";
import { ChartDownloader } from "./chartDownloader/ChartDownloader";
import { colors } from "../../assets/colors/barChartBkColor";
import { abbreviate } from "../../utils/abbreviate";

const ChartComponent = ({ loader, data, chartType, title, height, legend }) => {
  const canvasRef = useRef(null);
  const [chartInstace, setChartInstance] = useState(null);
  const [chartFullScreen, setChartFullScreen] = useState("View in full screen");

  const getdata = () => {
    const keys = [],
      orgUnits = [],
      backgroundColor = [];

    if (data) {
      for (let i = 0; i < data.length; i++) {
        keys.push(abbreviate(data[i].name) || data[i].id);
        orgUnits.push(data[i].organisationUnits);
        backgroundColor.push(colors[i]);
      }

      return {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            label: "",
            data: orgUnits,
            backgroundColor: backgroundColor,
          },
        ],
        labels: keys,
      };
    }
    return [];
  };

  const chartConfig = () => {
    return {
      type: chartType,
      data: getdata(),
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 10,
              boxWidth: 20,
            },
            display: legend,
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest",
          },
        },
      },
    };
  };

  useEffect(() => {
    if (data) {
      if (!chartInstace) {
        var chart = new Chart(canvasRef.current, chartConfig());
        setChartInstance(chart);
      } else {
        chartInstace.data = getdata();
        chartInstace.update();
      }
    }
  }, [data]);

  const onFullScreenChange = () => {
    if (chartFullScreen === "View in normal screen") {
      setChartFullScreen("View in full screen");
    } else {
      setChartFullScreen("View in normal screen");
    }
  };

  return (
    <Card className={chartFullScreen.replace(/\s+/g, "")}>
      <CardHeader className="d-flex">
        <h6 className="my-0 ml-0 mr-auto">{title}</h6>
        <ChartDownloader chartInstance={chartInstace} />
      </CardHeader>
      {loader && <LinearProgress />}
      <CardBody className="d-flex py-2">
        <canvas
          height={"210"}
          style={{ backgroundColor: "white" }}
          ref={canvasRef}
          className="blog-users-by-device m-auto"
        />
      </CardBody>
{/*       <CardFooter className="border-top">
        <Row>
          <Col></Col>
          <Col className="text-right view-report">
            <a
              onClick={() => {
                onFullScreenChange();
              }}
            >
              {chartFullScreen} &rarr;
            </a>
          </Col>
        </Row>
      </CardFooter> */}
    </Card>
  );
};

export default ChartComponent;

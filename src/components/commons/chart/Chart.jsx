/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "shards-react";
import { colors } from "../../../assets/colors/barChartBkColor";
import { LinearProgress } from "@mui/material";
import '../../../assets/styles/chart.css'
import { ChartDownloader } from "./chartDownloader/ChartDownloader";

const ChartComponent = ({ loader, summaries, chartType, title, lables, dados, cores }) => {
  const canvasRef = useRef(null);
  const [chartInstace, setChartInstance] = useState(null);
  const [chartFullScreen, setChartFullScreen] = useState('View in full screen');

  const getSummaries = () => {
    const users = [],
      prints = [],
      backgroundColor = [];

    if (summaries) {
      for (let i = 0; i < summaries.length; i++) {
        users.push(summaries[i].username || summaries[i].shortName);
        prints.push(summaries[i].totalPrints);
        backgroundColor.push(colors[i]);
      }
      return {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            label: "Total de óbitos sincronizados",
            data: prints,
            backgroundColor: backgroundColor,
          },
        ],
        labels: users,
      };
    } else if (lables || dados) {

      return {
        datasets: [
          {
            hoverBorderColor: "#ffffff",
            label: "Total de óbitos sincronizados",
            data: dados,
            backgroundColor: cores,
          },
        ],
        labels: lables,
      };
    }
    return [];
  };

  const chartConfig = () => {
    return {
      type: chartType,
      data: getSummaries(),
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20,
            },
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
    if (summaries || (lables && dados)) {
      if (!chartInstace) {
        var chart = new Chart(canvasRef.current, chartConfig());
        setChartInstance(chart);
      } else {
        chartInstace.data = getSummaries();
        chartInstace.update();
      }
    }
  }, [summaries, lables, dados]);


  const onFullScreenChange = () => {
    if (chartFullScreen === 'View in normal screen') {
      setChartFullScreen('View in full screen')
    } else {
      setChartFullScreen('View in normal screen')
    }
  }

  return (
    <Card className={chartFullScreen.replace(/\s+/g, '')}>
      <CardHeader className="border-bottom d-flex">
        <h6 className="my-0 ml-0 mr-auto">{title}</h6><ChartDownloader chartInstance={chartInstace} />
      </CardHeader>
      {loader && <LinearProgress />}
      <CardBody className="d-flex py-0">
        <canvas
          height="120"
          style={{ backgroundColor: 'white' }}
          ref={canvasRef}
          className="blog-users-by-device m-auto"
        />
      </CardBody>
      <CardFooter className="border-top">
        <Row>
          <Col></Col>
          <Col className="text-right view-report">
            <a onClick={() => onFullScreenChange()}>{chartFullScreen} &rarr;</a>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  );
};

export default ChartComponent;

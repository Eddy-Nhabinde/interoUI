import React from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../../../components/commons/PageTitle";
import LineChartHome from "../../../../components/commons/chart/LineChart";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../../../hooks/useFetch";
import {smallStats} from '../../../../components/commons/chart/smallStats';
import { SimpleBackdrop } from "../../../../components/commons/backdrop/Backdrop";
import { formaterToIsoDate } from "../../../../utils/services/dateFormater";
import SmallStat from "../../../../components/commons/chart/SmallStat";
import { ErrorPage } from "../../../../pages/error";

const CovidHome = () => {
  const { t } = useTranslation();
  const dashboardData = useFetch(`api/covid/immunization/certificate/monitoring/dashboards`)
  const fetchLastMonthData = useFetch(`api/covid/immunization/certificate/print/summaries?includeDateRange=true&paging=false&startDate=${(formaterToIsoDate(new Date().setDate(new Date().getDate() - 30)))}&endDate=${formaterToIsoDate(new Date())}`);
  
  if (dashboardData.isFetching || fetchLastMonthData.isFetching) {
    return <SimpleBackdrop open={true} />
  }

  if(dashboardData.error || fetchLastMonthData.error){
    return(
      <ErrorPage/>
    )
  }

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title={t("total_emitidos")}
          className="text-sm-left mb-3"
        />
      </Row>

      <Row>
        {smallStats(t, dashboardData).map((stats, idx) => (
          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStat
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              label={stats.label}
              value={stats.value}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
        ))}
      </Row>

      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <LineChartHome data='prints' date='data' prints={fetchLastMonthData.data} />
        </Col>
      </Row>
    </Container>
  );
};


export default CovidHome;

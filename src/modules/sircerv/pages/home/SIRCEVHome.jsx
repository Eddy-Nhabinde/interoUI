import React, { useState } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../../../components/commons/PageTitle";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../../../hooks/useFetch";
import { SimpleBackdrop } from "../../../../components/commons/backdrop/Backdrop";
import { ErrorPage } from "../../../../pages/error";
import ChartComponent from "../../../../components/commons/chart/Chart";
import { sircevSmallStats } from '../../components/sircevSamllStats/sircevSmallStats'
import SmallStat from "../../../../components/commons/chart/SmallStat";
import { getDates } from "../../utils/commons/getDates";
import LineChart from "../../components/lineChart/lineChart";
import { formatBarChartData } from "../../utils/commons/formarBarChartData";
import Filter from "../../components/filter/filter";
import { GetUrlParams } from "../../../../utils/commons/getUrlParams";
import { getSearchParams } from "../../utils/searchParams/searchParams";

const SIRCEVHome = () => {
  const { t } = useTranslation();
  const RelativePeriods = ["TODAY", "THIS_WEEK", "THIS_MONTH", "THIS_YEAR"]
  const { endDate, startDate } = GetUrlParams()
  const [sDate, setSDate] = useState(startDate);
  const [eDate, setEDate] = useState(endDate);
  const [selectedOu, setSelectedOu] = useState("");
  const { generatePeriod, last30Days } = getDates({ sDate, eDate })
  let data = []

  const totalGeral = useFetch(`api/monitoring/srcev/events/summaries?orgUnit=LJX5GuypkKy&${generatePeriod(true)}&filterDimentions=pe`);
  const fetchLastMonthData = useFetch(`api/monitoring/srcev/events/summaries?orgUnit=LJX5GuypkKy&period=${last30Days()}`);
  const barChartData = useFetch(`api/monitoring/srcev/events/summaries?orgUnit=${getSearchParams(selectedOu)}&${generatePeriod(false)}&filterDimentions=pe`);
  const { lables, prints, backgroundColor } = formatBarChartData(barChartData.data)

  RelativePeriods.map((val) => {
    data[val] = useFetch(`api/monitoring/srcev/events/summaries?orgUnit=LJX5GuypkKy&period=${val}`)
  })

  if (fetchLastMonthData.isFetching || totalGeral.isFetching || fetchLastMonthData.isFetching || barChartData.isFetching) {
    return <SimpleBackdrop open={true} />
  }

  if (fetchLastMonthData.error) { return <ErrorPage /> }

  if (data)
    RelativePeriods.map((val) => {
      if (data[val])
        if (data[val].data)
          if (data[val].data.data[0])
            data[val] = data[val].data.data[0].total
          else
            data[val] = 0
    })


  if (totalGeral.data)
    if (totalGeral.data.data) {
      console.log(totalGeral.data,'111')
      totalGeral.data = totalGeral.data.data[0].total
    }

  return (
    <Container fluid className="main-content-container px-4">
      <PageTitle
        title={t("total_emitidos")}
        className="text-sm-left mb-3"
      />

      <Row>
        {sircevSmallStats(t, data, totalGeral.data).map((stats, idx) => (
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

      <Filter selectedOu={selectedOu} setSelectedOu={setSelectedOu} setEDate={setEDate} setSDate={setSDate} sDate={sDate} eDate={eDate} />

      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <LineChart data={fetchLastMonthData.data} />
        </Col>
      </Row>

      <Row>
        <Col lg="12" md="12" sm="12" className="mb-4">
          <ChartComponent lables={lables} dados={prints} cores={backgroundColor} title='Sumário de óbitos sincronizados' chartType='bar' />
        </Col>
      </Row>
    </Container>
  );
};


export default SIRCEVHome;

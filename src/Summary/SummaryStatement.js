import React, { useEffect, useState } from 'react'
import { Col, Card, Spinner } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts';

const SummaryStatement = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [data, setData] = useState([1,2,3]);
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    async function getData(){
      await axios.get(`https://financialmodelingprep.com/api/v3/income-statement/${symbol.toUpperCase()}?limit=120&apikey=${apiKey}`)
        .then(res=>{
          setData(res?.data);
          isLoading(true);
        })
        .catch(err=>{
          if(err.response.status==429){
            setTimeout(getData, 2000);
          }
        })
    }
    getData();
  }, [symbol])
  const revenue = data?.map((item)=>{
    return item?.revenue;
  })
  const netIncome = data?.map((item)=>{
    return item?.netIncome;
  })
  const statementDate = data?.map((item)=>{
    return item?.date?.substring(0,4);
  })
  const revenueChart = {
    series: [{
      name: "Revenue",
      data: revenue,
    },{
      name: 'Net Income',
      data: netIncome,
    }],
    options: {
      chart: {
        toolbar:{
          show: false
        },
        animations: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'category',
        categories: statementDate,
        tickAmount: 3
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.round(value);
          }
        },
      },
      legend: {
        horizontalAlign: 'left'
      },
      stroke: {
        curve: 'straight',
      }
    },
  }
  return (
    <Col md={6}>
      {loading ? <Card>
      <Card.Body>
        <ReactApexChart options={revenueChart.options} series={revenueChart.series} type="bar" height={350} />
      </Card.Body>
      </Card> : <Spinner animation="border" />}
    </Col>
  )
}

export default SummaryStatement
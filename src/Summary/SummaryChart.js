import React, { useEffect, useState } from 'react'
import { Col, Card, Spinner } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts';

const SummaryChart = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [data, setData] = useState([1,2,3]);
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    async function getData(){
      isLoading(false);
      await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol.toUpperCase()}?apikey=${apiKey}`)
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
  const close = data?.map((item)=>{
    return item?.close;
  })
  const date = data?.map((item)=>{
    return item?.date?.substring(11, 16);
  })
  const areaChart = {
    series: [{
      name: "Price",
      data: close.reverse(),
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
        categories: date.reverse(),
        tickAmount: 5,
        labels:{
          rotate: 0,
        }
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return Math.round(value);
          }
        },
      },
      colors: ['#0de67a'],
      legend: {
        horizontalAlign: 'left'
      },
      stroke: {
        width: 2,
        curve: 'straight',
      }
    },
  }
  return (
    <Col md={6}>
      {loading ? <Card>
        <Card.Body>
          <ReactApexChart options={areaChart.options} series={areaChart.series} type="area" height={500} />
        </Card.Body>
      </Card> : <Spinner animation="border" />}
    </Col>
  )
}

export default SummaryChart
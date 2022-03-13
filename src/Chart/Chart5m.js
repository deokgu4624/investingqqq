import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'

const Chart5m = ({symbol, apiKey}) => {
  const axios = require('axios');
  const key = 'b17ccb55a59275323985acd76b2e7750';
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    isLoading(false);
    axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/5min/${symbol}?apikey=${apiKey}`)
      .then(res=>{
        setData(res.data);
        isLoading(true);
      })
  },[symbol])
  const close = data?.map((item)=>{
    return item.close;
  })
  const date = data?.map((item)=>{
    return item.date.substring(10, 16);
  })
  const areaChart = {
    series: [{
      name: "Price",
      data: close.reverse().slice(0, 20)
    }],
    options: {
      chart: {
        toolbar:{
          show: false
        },
        animations: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'category',
        categories: date.reverse().slice(0, 20),
        tickAmount: window.innerWidth > 575 ? 10 : 5,
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
    <Card.Body className={'chartWrapper'}>
      {loading ? <ReactApexChart options={areaChart.options} series={areaChart.series} type="area" height={500} /> : <Spinner animation="border" />}
    </Card.Body>
  )
}

export default Chart5m
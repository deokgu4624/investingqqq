import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'

const Chart1month = ({symbol, apiKey}) => {
  const axios = require('axios');
  const key = 'b17ccb55a59275323985acd76b2e7750';
  const [data, setData] = useState();
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    isLoading(false);
    axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${apiKey}`)
      .then(res=>{
        setData(res.data);
        isLoading(true);
      })
  },[symbol])
  const close = data?.historical.slice(0, 30).map((item)=>{
    return item.close;
  })
  const date = data?.historical.slice(0, 30).map((item)=>{
    return item.date;
  })
  const areaChart = {
    series: [{
      name: "Price",
      data: loading ? close.reverse() : []
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
        categories: loading ? date.reverse() : [],
        tickAmount: window.innerWidth > 991 ? 10 : 5,
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

export default Chart1month
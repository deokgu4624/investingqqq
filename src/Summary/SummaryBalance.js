import React, { useEffect, useState } from 'react'
import { Col, Card, Spinner } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts';

const SummaryBalance = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [data, setData] = useState([1,2,3]);
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    async function getData(){
      isLoading(false);
      await axios.get(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol.toUpperCase()}?apikey=${apiKey}&limit=120`)
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
  const assets = data?.map((item)=>{
    return item?.totalAssets;
  })
  const liabilities = data?.map((item)=>{
    return item?.totalLiabilities;
  })
  const balanceDate = data?.map((item)=>{
    return item?.date?.substring(0,4);
  })
  const balanceChart = {
    series: [{
      name: "Total Assets",
      data: assets,
    },{
      name: 'Total Liabilities',
      data: liabilities,
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
        categories: balanceDate,
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
          <ReactApexChart options={balanceChart.options} series={balanceChart.series} type="bar" height={350} />
        </Card.Body>
      </Card> : <Spinner animation="border" />}
    </Col>
  )
}

export default SummaryBalance
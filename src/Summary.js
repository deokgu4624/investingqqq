import React from 'react';
import { Row, Col, Card, ListGroup, Container, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Summary = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [data1, setData1] = useState();
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    async function getData(){
      try{
        isLoading(false);
        const res1 = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`);
        setData1(res1.data);
        const res3 = await axios.get(`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=120&apikey=${apiKey}`);
        setData3(res3.data);
        const res4 = await axios.get(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?apikey=${apiKey}&limit=120`);
        setData4(res4.data)
        const res2 = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=${apiKey}`);
        setData2(res2.data);
        isLoading(true);
      }catch(error){
        if(error.response.status==429){
          setTimeout(getData, 100);
        }
      }
    }
    getData();
  },[symbol])
  const close = data2.map((item)=>{
    return item.close;
  })
  const date = data2.map((item)=>{
    return item.date.substring(11, 16);
  })
  const areaChart = {
    series: [{
      name: "Price",
      data: close.reverse().slice(0, 200),
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
      grid: {
        show: false
      },
      xaxis: {
        type: 'category',
        categories: date.reverse().slice(0, 200),
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
  const revenue = data3.map((item)=>{
    return item.revenue;
  })
  const netIncome = data3.map((item)=>{
    return item.netIncome;
  })
  const statementDate = data3?.map((item)=>{
    return item.date.substring(0,4);
  })
  const revenueChart = {
    series: [{
      name: "Revenue",
      data: revenue.reverse(),
    },{
      name: 'Net Income',
      data: netIncome.reverse(),
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
        categories: statementDate.reverse(),
        tickAmount: 3
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value/1000000000 + 'B';
          }
        },
      },
      legend: {
        horizontalAlign: 'center'
      },
      stroke: {
        curve: 'straight',
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
        }
      }
    },
  }
  const assets = data4.map((item)=>{
    return item.totalAssets;
  })
  const liabilities = data4.map((item)=>{
    return item.totalLiabilities;
  })
  const balanceDate = data4.map((item)=>{
    return item.date.substring(0,4);
  })
  const balanceChart = {
    series: [{
      name: "Total Assets",
      data: assets.reverse(),
    },{
      name: 'Total Liabilities',
      data: liabilities.reverse(),
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
        categories: balanceDate.reverse(),
        tickAmount: 3
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value/1000000000 + 'B';
          }
        },
      },
      legend: {
        horizontalAlign: 'center'
      },
      stroke: {
        curve: 'straight',
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
        }
      }
    },
  }
  return (
    <Container>
      {/* <div className={'summaryTitleWrapper'}>
        <Card.Img className={'symbolImg'} src={data1?.[0].image} />
        <Card.Title className={'summaryTitle'}>{data1?.[0].companyName}({data1?.[0].symbol})</Card.Title>
      </div> */}
      <h3>Financial Summary</h3>
      <Row>
        <Col md={6}>
          <Card>
            <ListGroup>
              <ListGroup.Item><p>Symbol</p><p>{data1?.[0].symbol}</p></ListGroup.Item>
              <ListGroup.Item><p>Price</p><p>${data1?.[0].price}</p></ListGroup.Item>
              <ListGroup.Item><p>Changes</p><p>{data1?.[0].changes}</p></ListGroup.Item>
              <ListGroup.Item><p>Beta</p><p>{data1?.[0].beta}</p></ListGroup.Item>
              <ListGroup.Item><p>CEO</p><p>{data1?.[0].ceo}</p></ListGroup.Item>
              <ListGroup.Item><p>Volume Avg.</p><p>{data1?.[0].volAvg}M</p></ListGroup.Item>
              <ListGroup.Item><p>Market Cap</p><p>{data1?.[0].mktCap}B</p></ListGroup.Item>
              <ListGroup.Item><p>52Week Range</p><p>{data1?.[0].range}</p></ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body className={'chartWrapper'}>
              {loading ? <ReactApexChart options={areaChart.options} series={areaChart.series} type="area" height={280} /> : <Spinner animation='border' />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Financials</Card.Title>
              <ReactApexChart options={revenueChart.options} series={revenueChart.series} type="bar" height={350} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Income Statement</Card.Title>
              <ReactApexChart options={balanceChart.options} series={balanceChart.series} type="bar" height={350} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Summary
import React, { useEffect, useState } from 'react'
import { Card, Placeholder, Row, Col } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts';

const MajorsIndexes = (props) => {
  const axios = require('axios');
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [chart1, setChart1] = useState([]);
  const [chart2, setChart2] = useState([]);
  const [chart3, setChart3] = useState([]);
  const [loading1, isLoading1] = useState(false);
  const [loading2, isLoading2] = useState(false);
  const [loading3, isLoading3] = useState(false);
  useEffect(()=>{
    async function getData(){
      try{
        isLoading1(false);
        isLoading2(false);
        isLoading3(false);
        const res1 = await axios.get(`https://financialmodelingprep.com/api/v3/quote/%5EGSPC?apikey=${props.apiKey}`);
        setData1(res1.data);
        isLoading1(true);
        const chartRes1 = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/%5EGSPC?apikey=${props.apiKey}`);
        setChart1(chartRes1.data)
        const res2 = await axios.get(`https://financialmodelingprep.com/api/v3/quote/%5EDJI?apikey=${props.apiKey}`);
        setData2(res2.data);
        isLoading2(true);
        const chartRes2 = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/%5EDJI?apikey=${props.apiKey}`);
        setChart2(chartRes2.data)
        const res3 = await axios.get(`https://financialmodelingprep.com/api/v3/quote/%5EIXIC?apikey=${props.apiKey}`);
        setData3(res3.data);
        isLoading3(true);
        const chartRes3 = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/%5EIXIC?apikey=${props.apiKey}`);
        setChart3(chartRes3.data)
      }catch(error){
        if(error.response.status==429){
          setTimeout(getData, 100);
        }
      }
    }
    getData();
  },[])
  const chart1Close = chart1.slice(0, 60).map((item)=>{
    return item.close;
  })
  const chart1Date = chart1.slice(0, 60).map((item)=>{
    return item.date;
  })
  const areaChart1 = {
    series: [{
      name: "Price",
      data: chart1Close.reverse(),
    }],
    options: {
      chart: {
        toolbar:{
          show: false
        },
        animations: {
          enabled: false,
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: chart1Date.reverse(),
      },
      colors: ['#0de67a'],
      stroke: {
        width: 2,
        curve: 'straight',
      },
      tooltip: {
        enabled: false,
      }
    },
  }
  const chart2Close = chart2.slice(0, 60).map((item)=>{
    return item.close;
  })
  const chart2Date = chart2.slice(0, 60).map((item)=>{
    return item.date;
  })
  const areaChart2 = {
    series: [{
      name: "Price",
      data: chart2Close.reverse(),
    }],
    options: {
      chart: {
        toolbar:{
          show: false
        },
        animations: {
          enabled: false,
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: chart2Date.reverse(),
      },
      colors: ['#0de67a'],
      stroke: {
        width: 2,
        curve: 'straight',
      },
      tooltip: {
        enabled: false,
      }
    },
  }
  const chart3Close = chart3.slice(0, 60).map((item)=>{
    return item.close;
  })
  const chart3Date = chart3.slice(0, 60).map((item)=>{
    return item.date;
  })
  const areaChart3 = {
    series: [{
      name: "Price",
      data: chart3Close.reverse(),
    }],
    options: {
      chart: {
        toolbar:{
          show: false
        },
        animations: {
          enabled: false,
        },
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: chart3Date.reverse(),
      },
      colors: ['#0de67a'],
      stroke: {
        width: 2,
        curve: 'straight',
      },
      tooltip: {
        enabled: false,
      }
    },
  }
  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            {loading1 ? <Col md={6}>
              <Card.Title>S&P 500</Card.Title>
              <Card.Text>${data1?.[0].price}</Card.Text>
              <Card.Text>{(Math.round(data1?.[0].change*100)/100).toString()}</Card.Text>
              <Card.Text>{Math.round(data1?.[0].changesPercentage*100)/100}%</Card.Text>
            </Col> :
            <Col>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} />
                <Placeholder xs={6} />
                <Placeholder xs={7} />
              </Placeholder>
            </Col>}
            <Col md={6}>
              <ReactApexChart options={areaChart1.options} series={areaChart1.series} type="area" height={100} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Row>
            {loading2 ? <Col md={6}>
              <Card.Title>Dow Jondes</Card.Title>
              <Card.Text>${data2?.[0].price}</Card.Text>
              <Card.Text>{(Math.round(data2?.[0].change*100)/100).toString()}</Card.Text>
              <Card.Text>{Math.round(data2?.[0].changesPercentage*100)/100}%</Card.Text>
            </Col> :
            <Col>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} />
                <Placeholder xs={6} />
                <Placeholder xs={7} />
              </Placeholder>
            </Col>}
            <Col md={6}>
              <ReactApexChart options={areaChart2.options} series={areaChart2.series} type="area" height={100} />
            </Col>
          </Row>
          </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Row>
            {loading3 ? <Col md={6}>
              <Card.Title>NASDAQ</Card.Title>
              <Card.Text>${data3?.[0].price}</Card.Text>
              <Card.Text>{(Math.round(data3?.[0].change*100)/100).toString()}</Card.Text>
              <Card.Text>{Math.round(data3?.[0].changesPercentage*100)/100}%</Card.Text>
            </Col> :
            <Col>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} />
                <Placeholder xs={6} />
                <Placeholder xs={7} />
              </Placeholder>
            </Col>}
            <Col md={6}>
              <ReactApexChart options={areaChart3.options} series={areaChart3.series} type="area" height={100} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default MajorsIndexes
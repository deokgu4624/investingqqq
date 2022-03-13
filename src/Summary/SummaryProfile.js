import React, { useEffect, useState } from 'react'
import { Col, Card, Spinner } from 'react-bootstrap'

const SummaryProfile = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [data, setData] = useState([1,2,3]);
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    async function getData(){
      isLoading(false);
      await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`)
        .then(res=>{
          setData(res.data);
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
  return (
    <Col md={6}>
      {loading ? <Card>
        <Card.Body>
          <Card.Img className={'symbolImg'} src={data?.[0]?.image} />
          <Card.Text>{data?.[0]?.companyName}({data?.[0]?.symbol})🏁🇺🇸</Card.Text>
          <Card.Text>{data?.[0]?.symbol}</Card.Text>
          <Card.Text>${data?.[0]?.price}</Card.Text>
          <Card.Text>{data?.[0]?.changes}</Card.Text>
          <Card.Text>{data?.[0]?.beta}</Card.Text>
          <Card.Text>{data?.[0]?.ceo}</Card.Text>
          <Card.Text>{data?.[0]?.volAvg}M</Card.Text>
          <Card.Text>{data?.[0]?.mktCap}B</Card.Text>
          <Card.Text>{data?.[0]?.range}</Card.Text>
        </Card.Body>
      </Card> : <Spinner animation="border" /> }
    </Col>
  )
}

export default SummaryProfile
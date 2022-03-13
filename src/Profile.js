import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Profile = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [profile, setProfile] = useState();
  useEffect(()=>{
    axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`)
        .then((res)=>{
          setProfile(res.data);
        })
  },[symbol])
  return (
    <Container>
      <h3>Profile</h3>
      <Card style={{marginBottom:'60px'}}>
        <Card.Body>
          <Row>
            <Col xs={6} sm={6}>
              <Card.Title>CEO</Card.Title>
              <Card.Text>{profile?.[0].ceo}</Card.Text>
            </Col>
            <Col xs={6} sm={6}>
              <Card.Title>Sector</Card.Title>
              <Card.Text>{profile?.[0].sector}</Card.Text>
            </Col>
            <Col xs={6} sm={6}>
              <Card.Title>Industry</Card.Title>
              <Card.Text>{profile?.[0].industry}</Card.Text>
            </Col>
            <Col xs={6} sm={6}>
              <Card.Title>Website</Card.Title>
              <Card.Text>{profile?.[0].website}</Card.Text>
            </Col>
            <Col xs={6} sm={6}>
              <Card.Title>Exchange</Card.Title>
              <Card.Text>{profile?.[0].exchange}</Card.Text>
            </Col>
          </Row>
          <Row style={{marginTop:'30px'}}>
            <Card.Title>Description</Card.Title>
            <Card.Text>{profile?.[0].description}</Card.Text>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Profile
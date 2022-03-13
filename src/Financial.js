import React, {useState, useEffect} from 'react'
import { Container, Nav, Navbar, Card, Placeholder } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Summary from './Summary';
import Statements from './Statements';
import BalanceSheet from './BalanceSheet';
import Chart from './Chart';
import Profile from './Profile';
import usFlag from './img/us.png'

const Financial = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [data, setData] = useState();
  const [loading, isLoading] = useState(false);
  useEffect(()=>{
    axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${apiKey}`)
        .then((res)=>{
          setData(res.data);
          isLoading(true);
        })
  },[symbol])
  return (
    <Container>
      <Navbar expand="lg">
      <Container>
        {loading ? <Navbar.Brand>
          <Card.Img className={'symbolImg'} src={data?.[0].image} />
          {data?.[0].companyName}({data?.[0].symbol})
          <span className={'shortName'}>
          <Card.Img className={'symbolImg'} src={usFlag} />
          {data?.[0].exchangeShortName}
          </span>
        </Navbar.Brand> : null}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to='/financial/summary'><Nav.Link>Financial Summary</Nav.Link></LinkContainer>
            <LinkContainer to='/financial/statements'><Nav.Link>Financial Statements</Nav.Link></LinkContainer>
            <LinkContainer to='/financial/balanceSheet'><Nav.Link>Balance Sheet</Nav.Link></LinkContainer>
            <LinkContainer to='/financial/chart/1minute'><Nav.Link>Chart</Nav.Link></LinkContainer>
            <LinkContainer to='/financial/profile'><Nav.Link>Profile</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      <Routes>
        <Route path='/summary' element={<Summary symbol={symbol} apiKey={apiKey} />} />
        <Route path='/statements' element={<Statements symbol={symbol} apiKey={apiKey} />} />
        <Route path='/balanceSheet' element={<BalanceSheet symbol={symbol} apiKey={apiKey} />} />
        <Route path='/chart/*' element={<Chart symbol={symbol} apiKey={apiKey} />} />
        <Route path='/profile' element={<Profile symbol={symbol} apiKey={apiKey} />} />
      </Routes>
    </Container>
  )
}

export default Financial
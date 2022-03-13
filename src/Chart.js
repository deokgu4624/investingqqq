import React from 'react';
import { Container, Nav, Navbar ,Card, Pagination } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Routes, Route } from 'react-router-dom';
import Chart1m from './Chart/Chart1m';
import Chart5m from './Chart/Chart5m';
import Chart1month from './Chart/Chart1month';
import Chart6month from './Chart/Chart6month';
import Chart1year from './Chart/Chart1year';

const Chart = ({symbol, apiKey}) => {
  return (
    <Container>
      <h3>Historical Chart</h3>
      <Card>
        <Pagination size='sm' className={'pagination'}>
        <LinkContainer to='1minute'><Pagination.Item>1</Pagination.Item></LinkContainer>
        <LinkContainer to='5minute'><Pagination.Item>5</Pagination.Item></LinkContainer>
        <LinkContainer to='1month'><Pagination.Item>1M</Pagination.Item></LinkContainer>
        <LinkContainer to='6month'><Pagination.Item>6M</Pagination.Item></LinkContainer>
        <LinkContainer to='1year'><Pagination.Item>1Y</Pagination.Item></LinkContainer>
        </Pagination>
        <Routes>
          <Route path='/1minute' element={<Chart1m symbol={symbol} apiKey={apiKey} />} />
          <Route path='/5minute' element={<Chart5m symbol={symbol} apiKey={apiKey} />} />
          <Route path='/1month' element={<Chart1month symbol={symbol} apiKey={apiKey} />} />
          <Route path='/6month' element={<Chart6month symbol={symbol} apiKey={apiKey} />} />
          <Route path='/1year' element={<Chart1year symbol={symbol} apiKey={apiKey} />} />
        </Routes>
      </Card>
    </Container>
  )
}

export default Chart
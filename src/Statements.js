import React, { useEffect, useState } from 'react'
import { Table, Card, Container } from 'react-bootstrap';

const Statements = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [statement, setStatement] = useState();
  useEffect(()=>{
    axios.get(`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=120&apikey=${apiKey}`)
        .then((res)=>{
          setStatement(res.data);
        })
  },[symbol])
  return (
    <Container>
      <h3>Income statement</h3>
      <Card style={{marginBottom:'60px'}}>
        <Table responsive bordered hover className={'table'}>
        <thead>
          <tr>
            <td className={'category'}>Year</td>
            {statement?.map((item, index)=>{
              return(
                <td className={'category'} key={index}>{item.calendarYear}</td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
          <td className={'category'}>Revenue</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.revenue}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Cost of Revenue</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.costOfRevenue}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Gross Profit</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.grossProfit}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Operating Expenses</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.operatingExpenses}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Selling General and Administrative Expenses</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.sellingGeneralAndAdministrativeExpenses}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>General AndAdministrative Expenses</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.generalAndAdministrativeExpenses}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Selling and Marketing Expenses</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.sellingAndMarketingExpenses}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other Expenses</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.otherExpenses}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Cost and Expenses</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.costAndExpenses}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Operating Income</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.operatingIncome}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Interest Expense</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.interestExpense}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Income Tax Expense</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.incomeBeforeTax}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Net Income</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.netIncome}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Weighted Average Shares Outstanding</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.weightedAverageShsOut}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Weighted Average Shares Outstanding (Diluted)</td>
          {statement?.map((item, index)=>{
              return(
                <td key={index}>{item.weightedAverageShsOutDil}</td>
              )
            })}
          </tr>
        </tbody>
        </Table>
      </Card>
    </Container>
  )
}

export default Statements
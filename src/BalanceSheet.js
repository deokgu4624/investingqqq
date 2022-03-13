import React, {useState, useEffect} from 'react'
import { Card, Container, Table } from 'react-bootstrap';

const BalanceSheet = ({symbol, apiKey}) => {
  const axios = require('axios');
  const [balance, setBalance] = useState();
  useEffect(()=>{
    axios.get(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?apikey=${apiKey}&limit=120`)
        .then((res)=>{
          setBalance(res.data);
        })
  },[symbol])
  return (
    <Container>
      <h3>Balance Sheet Statement</h3>
      <Card style={{marginBottom:'60px'}}>
        <Table responsive bordered hover>
        <thead>
          <tr>
            <td className={'category'}>Year</td>
            {balance?.map((item, index)=>{
              return(
                <td key={index} className={'category'}>{item.calendarYear}</td>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
          <td className={'category'}>Total assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total Current Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalCurrentAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Cash and Short Term Investments</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.cashAndShortTermInvestments}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Cash and cash equivalents</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.cashAndCashEquivalents}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Short Term Investments</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.shortTermInvestments}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Receivables</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.netReceivables}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Inventory</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.inventory}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other Current Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.otherCurrentAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total non-current Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalNonCurrentAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Property, Plant & Equipment Net</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.propertyPlantEquipmentNet}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Goodwill and Intangible Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.goodwillAndIntangibleAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Goodwill</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.goodwill}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Intangible Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.intangibleAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Long Term Investments</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.longTermInvestments}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other non-current Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.otherNonCurrentAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other Assets</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.otherAssets}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total liabilities</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalLiabilities}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total current liabilities</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalCurrentLiabilities}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Payables</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.accountPayables}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Short Term debt</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.shortTermDebt}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Deferred revenue</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.deferredRevenue}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other Current Liabilities</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.otherCurrentLiabilities}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total non-current liabilities</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalNonCurrentLiabilities}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Long Term debt</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.longTermDebt}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other non-current Liabilities</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.otherNonCurrentLiabilities}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total shareholders equity</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalStockholdersEquity}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Common Stock</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.commonStock}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Retained earnings</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.retainedEarnings}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Accumulated Other Comprehensive Income Loss</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.accumulatedOtherComprehensiveIncomeLoss}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Other Stockholders Equity</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.othertotalStockholdersEquity}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total debt</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalDebt}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Total Investments</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.totalInvestments}</td>
              )
            })}
          </tr>
          <tr>
          <td className={'category'}>Net Debt</td>
          {balance?.map((item, index)=>{
              return(
                <td key={index}>{item.netDebt}</td>
              )
            })}
          </tr>
        </tbody>
        </Table>
      </Card>
    </Container>
  )
}

export default BalanceSheet
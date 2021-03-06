# 주식시장 시세 사이트
http://investingqqq.netlify.app/

## 목차
1. [개요](#개요)
2. [과정](#과정)  
  2.1. [Axios로 뉴스 및 티커심볼 데이터 받아오기](#axios로-뉴스-및-티커심볼-데이터-받아오기)  
  2.2. [뉴스 목록 만들기](#뉴스-목록-만들기)  
  2.3. [기사 페이지 만들기](#기사-페이지-만들기)  
  2.4. [주요 주가지수 데이터 가져오기](#주요-주가지수-데이터-가져오기)  
  2.5. [주요 주가지수 데이터 가공](#주요-주가지수-데이터-가공)  
  2.6. [주요 주가지수 차트 데이터](#주요-주가지수-차트-데이터)  
  2.7. [검색 기능 만들기](#검색-기능-만들기)  
  2.8. [재무정보 개요 페이지](#재무정보-개요-페이지)  
  2.9. [재무정보 손익계산서](#재무정보-손익계산서)  
  2.10 [재무정보 대차대조표](#재무정보-대차대조표)  
  2.11 [재무정보 차트](#재무정보-차트)  
  2.12 [재무정보 프로필](#재무정보-프로필)  
3. [사용한 라이브러리](#사용한-라이브러리)
4. 
## 개요
React, Axios, Financial Modeling Prep API를 사용한 주식시장 뉴스 및 시세 웹사이트입니다. 주가 지수와 주식시장 뉴스목록이 표시되고 AAPL이나 TSLA같은 티커 심볼로 검색하면 해당 기업의 재무정보와 차트를 보여줍니다.  
  
메인화면입니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158133915-31091b72-8cb9-4c2d-8233-386c683c0471.png)

주식시장 뉴스 목록입니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158135475-9bbde6c2-6a50-4ef5-a9b1-18b321a309f8.png)

뉴스를 클릭하면 해당 기사를 읽어 볼 수 있습니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158135614-a7cd7ecc-9aab-4ed3-95d2-2a811b28c819.png)

재무정보 요약 화면입니다. 간단한 프로필과 시가 차트, 손익계산서 차트, 대차 대조표 차트를 표시합니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158134795-fb33e98f-7de2-42a4-bcf3-6cd10f8c8c4e.png)

손익계산서 표입니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158134985-89d8e498-63a8-4b75-ac3e-a40f4fdcdef5.png)

대차 대조표입니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158135818-db44b4c3-d894-453b-8864-7d411ab72783.png)

차트입니다. 좌측 상단의 버튼으로 여러 시간 간격의 차트를 볼 수 있습니다..
![제목 없음](https://user-images.githubusercontent.com/37141223/158135911-6eb9b314-e45c-4a25-95ba-4917f06c0873.png)

프로필입니다. 기본적인 기업 정보를 나타냅니다.
![제목 없음](https://user-images.githubusercontent.com/37141223/158136026-197f745f-79b4-4cc8-91ec-5a487712ea3a.png)

## 과정
### Axios로 뉴스 및 티커심볼 데이터 받아오기
`useEffect`는 axios로 뉴스 목록 데이터와 검색에 사용될 티커 심볼 목록 데이터를 받습니다.
```javascript
useEffect(()=>{
  async function getData(){
    try{
      isLoading(false);
      const res1 = await axios.get(`https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=12&apikey=${key}`)
      setNews(res1.data);
      const res2 = await axios.get(`https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=${key}`)
      setList(res2.data);
      isLoading(true);
    }
    catch(error){
      if(error.response.status == 429){
        setTimeout(getData, 100);
      }
    }
    }
  getData();
}, [])
```
### 뉴스 목록 만들기
`map`함수는 뉴스 목록을 반환합니다. `LinkContainer`로 기사 페이지의 링크를 걸어놓아서 클릭했을 때 기사를 읽어 볼 수 있습니다. `setArticle`은 현재 클릭한 기사의 배열을 반환합니다.
```javascript
<LinkContainer to='/news' className={'news'} onClick={()=>{setArticle(news?.content?.[0])}}>
  <Card>
    <img src={news?.content?.[0].image} />
    <Card.Body>
      <Card.Title>{news?.content?.[0].title}</Card.Title>
    </Card.Body>
  </Card>
</LinkContainer>
{news?.content?.slice(1, news?.content?.length).map((item, index)=>{
  return(
    <LinkContainer to='/news' key={index} className={'news'} onClick={()=>{setArticle(news?.content?.[index+1])}}>
      <Card className={'horizontalCard'}>
        <Card.Img className={'cardImg'} src={item?.image} />
        <Card.Body className={'cardBody'}>
          <Card.Title>{item?.title}</Card.Title>
          <Card.Text className={'date'}>{item?.date}</Card.Text>
          <Card.Text dangerouslySetInnerHTML={ {__html: item?.content} } className={'textWrapper'} />
        </Card.Body>
      </Card>
    </LinkContainer>
  )
})}
```
### 기사 페이지 만들기
클릭한 기사의 배열은 `props`로 넘겨받아 기사 페이지에 표시됩니다.
```javascript
<Container>
  <Card style={{marginBottom:'60px'}}>
    <Card.Img src={props.article.image} />
    <Card.Body>
    <Card.Title>{props.article.title}</Card.Title>
    <Card.Text>{props.article.date}</Card.Text>
    <Card.Text>by {props.article.author}</Card.Text>
    <Card.Text dangerouslySetInnerHTML={ {__html: props.article.content} } />
    </Card.Body>
  </Card>
</Container>
```
### 주요 주가지수 데이터 가져오기
`useEffect`는 axios로 s&p500, 다우존스, 나스닥의 분 단위 지수 데이터를 가져옵니다.
```javascript
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
```
### 주요 주가지수 데이터 가공
`map`함수는 1시간치의 주가지수와 시간을 반환합니다.
```javascript
const chart1Close = chart1.slice(0, 60).map((item)=>{
  return item.close;
})
const chart1Date = chart1.slice(0, 60).map((item)=>{
  return item.date;
})
const chart2Close = chart2.slice(0, 60).map((item)=>{
  return item.close;
})
const chart2Date = chart2.slice(0, 60).map((item)=>{
  return item.date;
})
const chart3Close = chart3.slice(0, 60).map((item)=>{
  return item.close;
})
const chart3Date = chart3.slice(0, 60).map((item)=>{
  return item.date;
})
```
### 주요 주가지수 차트 데이터
가공된 데이터는 각각 차트옵션의 `data`로 들어갑니다.
```javascript
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
```
### 검색 기능 만들기
검색창에 엔터키를 누르거나 검색 버튼을 누르게 되면 `indexOf`함수는 `input`의 `value`를 대문자로 변환하여 반환합니다.  
axios로 받아온 티커 심볼 목록 중에 반환된 값이 없으면 `alert`이 뜹니다.  
반환된 값이 있으면 `setSymbol`은 재무정보 페이지로 값을 전달하며 해당 페이지로 이동합니다.
```javascript
const handleKeyPress=(e)=>{
  if(e.key == 'Enter'){
    if(list.indexOf(e.target.value.toUpperCase()) == -1){
      alert('티커를 입력해주세요. ex)AAPL');
    }else{
      setSymbol(e.target.value.toUpperCase());
      ref.current.value='';
      navigate('/financial/summary');
    }
  }
}
const onClick=()=>{
  if(list.indexOf(ref.current.value.toUpperCase()) == -1){
    alert('티커를 입력해주세요. ex)AAPL');
  }else{
    setSymbol(ref.current.value.toUpperCase());
    ref.current.value='';
    navigate('/financial/summary')
  }
}
return(
  <InputGroup size='sm'>
    <Form.Control onKeyPress={handleKeyPress} ref={ref} placeholder={'티커를 입력해주세요. ex)AAPL'}/>
    <InputGroup.Text onClick={onClick}>Search</InputGroup.Text>
  </InputGroup>
)
```
### 재무정보 개요 페이지
`useEffect`는 axios로 검색한 기업의 프로필, 손익계산서, 대차대조표, 분단위 차트 데이터를 받아옵니다. 데이터는 `data1~data4`로 각각 들어갑니다. 429에러가 나면 재실행됩니다.
```javascript
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
```
받아온 프로필 정보를 표시합니다.
```javascript
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
```
분단위 차트에 들어갈 데이터입니다. `substring`은 날짜의 시간부분만 반환합니다.
```javascript
const close = data2.map((item)=>{
  return item.close;
})
const date = data2.map((item)=>{
  return item.date.substring(11, 16);
})
```
손익계산서 차트에 들어갈 데이터입니다. `substring`은 날짜의 연도만 반환합니다.
```javascript
const revenue = data3.map((item)=>{
  return item.revenue;
})
const netIncome = data3.map((item)=>{
  return item.netIncome;
})
const statementDate = data3?.map((item)=>{
  return item.date.substring(0,4);
})
```
대차대조표 차트에 들어갈 데이터입니다. `substring`은 날짜의 연도만 반환합니다.
```javascript
const assets = data4.map((item)=>{
  return item.totalAssets;
})
const liabilities = data4.map((item)=>{
  return item.totalLiabilities;
})
const balanceDate = data4.map((item)=>{
  return item.date.substring(0,4);
  })
```
### 재무정보 손익계산서
`useEffect`는 axios로 손익계산서 데이터를 받아옵니다. 데이터는 `data`로 들어갑니다.
```javascript
useEffect(()=>{
  axios.get(`https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=120&apikey=${apiKey}`)
      .then((res)=>{
        setStatement(res.data);
      })
},[symbol])
```
`map`함수는 받아온 데이터의 카테고리별로 연도에 따라 표로 반환합니다.
```javascript
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
      ...
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
```
### 재무정보 대차대조표
`useEffect`는 axios로 대차대조표 데이터를 받아옵니다. 데이터는 `data`로 들어갑니다.
```javascript
useEffect(()=>{
  axios.get(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${symbol}?apikey=${apiKey}&limit=120`)
      .then((res)=>{
        setBalance(res.data);
      })
},[symbol])
```
`map`함수는 받아온 데이터의 카테고리별로 연도에 따라 표로 반환합니다.
```javascript
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
      ...
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
```
### 재무정보 차트
`useEffect`는 해당 기업의 차트 데이터를 가져옵니다. 가져온 데이터는 `data`로 들어갑니다.
```javascript
useEffect(()=>{
  isLoading(false);
  axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=${apiKey}`)
    .then(res=>{
      setData(res.data);
      isLoading(true);
    })
},[symbol])
```
차트에 들어갈 데이터입니다. `map`함수는 시가와 날짜를 반환합니다. `substring`은 날짜의 시간부분만 반환합니다.
```javascript
const close = data?.map((item)=>{
  return item.close;
})
const date = data?.map((item)=>{
  return item.date.substring(10, 16);
})
```
차트 옵션입니다. 가공된 데이터는 차트 옵션의 `data`로 들어갑니다.
```javascript
const areaChart = {
  series: [{
    name: "Price",
    data: close.reverse().slice(0, 200)
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
      categories: date.reverse().slice(0, 200),
      tickAmount: window.innerWidth > 575 ? 10 : 5,
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
```
### 재무정보 프로필
`useEffect`는 해당 기업의 프로필 정보를 가져옵니다. 가져온 데이터는 `data`로 들어갑니다.
```javascript
useEffect(()=>{
  isLoading(false);
  axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/1min/${symbol}?apikey=${apiKey}`)
    .then(res=>{
      setData(res.data);
      isLoading(true);
    })
},[symbol])
```
받아온 데이터들은 각각의 정보들로 표시됩니다.
```javascript
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
```
## 사용한 라이브러리
`react` `axios` `react-router-dom` `react-bootstrap` `apexcharts`

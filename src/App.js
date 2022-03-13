import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useRef } from 'react';
import { Container, Card, Col, Row, Nav, Navbar, InputGroup, Form } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import './App.css';
import { useNavigate  } from 'react-router-dom';
import Financial from './Financial';
import News from './News';
import MajorsIndexes from './MajorsIndexes';
import money from './img/money.png'

function App() {
  const axios = require('axios');
  const key = '2774655421f79f1bc18de3b2ff6706d8';
  const [news, setNews] = useState();
  const [article, setArticle] = useState();
  const [list, setList] = useState();
  const [symbol, setSymbol] = useState('AAPL');
  const navigate = useNavigate ();
  const ref= useRef();
  const [loading, isLoading] = useState(false);

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
          getData();
        }
      }
      }
    getData();
  }, [])

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

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to='/'><Navbar.Brand><Card.Img src={money} className={'logo'}/>Investing</Navbar.Brand></LinkContainer>
            <InputGroup size='sm'>
              <Form.Control onKeyPress={handleKeyPress} ref={ref} placeholder={'티커를 입력해주세요. ex)AAPL'}/>
              <InputGroup.Text onClick={onClick}>Search</InputGroup.Text>
            </InputGroup>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={
          <Container>
            <Row>
              <Col lg={9} style={{marginBottom:'60px'}}>
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
              </Col>
              <Col lg={3}>
                <MajorsIndexes apiKey={key} />
              </Col>
            </Row>
          </Container>
        } />
        <Route path='/financial/*' element={
          <Financial symbol={symbol} apiKey={key} />
        } />
        <Route path='/news' element={
          <News article={article} apiKey={key} />
        } />
      </Routes>
    </>
  );
}

export default App;

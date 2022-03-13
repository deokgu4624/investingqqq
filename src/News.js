import React from 'react'
import { Container, Card, Col, Row } from 'react-bootstrap'

const News = (props) => {
  return (
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
  )
}

export default News
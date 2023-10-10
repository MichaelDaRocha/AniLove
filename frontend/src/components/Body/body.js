import { useRef } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AnimeList from '../anime-list/anime-list'
import Block from '../block/block'

const Body = () => {  
  const like = useRef()
  const dislike = useRef()

  
  return (
    <Container fluid>
      <Row className='h-100'>
        <Col xs={5} className='p-0'>
          <Block color='lightgreen' refz={like}/>
        </Col>

        <Col xs={2} className='p-0 h-100'>
          <AnimeList like={like} dislike={dislike}/>
        </Col>

        <Col xs={5} className='p-0'>
          <Block color='#ff474c' refz={dislike}/>
        </Col>
      </Row>
    </Container>
  );
}

export default Body;

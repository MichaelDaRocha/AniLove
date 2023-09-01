import './body.css';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { selectImgsL, addMany } from '../../redux/slices/malSlice';
import DraggableAnime from '../draggable-anime/draggable-anime'
import MyAnimeList from '../../services/mal';

const Body = () => {
  const dispatch = useDispatch()
  
  const client = useRef(new MyAnimeList())
  const imgsL = useSelector(selectImgsL).map(imgsL => (
    <DraggableAnime
      src={imgsL.src}
      alt={imgsL.alt}
      id={imgsL.key}
    />
  ))

  useEffect(() => {
    client.current.loadThisSeasonAnime(data => dispatch(addMany(data)))
  }, [dispatch])

  return (
    <Container fluid>
      <Row className='h-100'>
        <Col xs={5} className='like-box'/>

        <Col xs={2} className='queue-box h-100'>
          {imgsL}
        </Col>

        <Col xs={5} className='dislike-box'/>
      </Row>
    </Container>
  );
}

export default Body;

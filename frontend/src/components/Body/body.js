import './body.css';

import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { mediumImg, addMany } from '../../redux/slices/malSlice';
import MyAnimeList from '../../services/mal';

const Body = () => {
  const dispatch = useDispatch()
  
  const client = useRef(new MyAnimeList())
  const imgUrls = useSelector(mediumImg)

  useEffect(() => {
    client.current.loadThisSeasonAnime(data => dispatch(addMany(data)))
  }, [dispatch])

  return (
    <Container fluid>
      <Row className='h-100'>
        <Col xs={5} className='like-box'/>

        <Col xs={2} className='queue-box h-100'>
          {imgUrls.map(url => <img src={url} alt='anime' key={url}/>)}
        </Col>

        <Col xs={5} className='dislike-box'/>
      </Row>
    </Container>
  );
}

export default Body;

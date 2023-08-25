import './body.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { selectMed, addMany } from '../../redux/slices/malSlice';
import MyAnimeList from '../../services/mal';

function Body(props) {
  const dispatch = useDispatch()
  const ImgURL = useSelector(selectMed)

  useEffect(() => {
    const client = new MyAnimeList()
    client.loadSeasonalAnime(2022, 7, data => dispatch(addMany(data)))
  }, [dispatch])

  return (
    <Container fluid className={props.className}>
      <Row className='flex-grow-1 flex'>
        <Col xs={5} className='green border'/>

        <Col className='grey border overflow-y-scroll'>
          {ImgURL.map(url => <img src={url}/>)}
        </Col>

        <Col xs={5} className='red border'/>
      </Row>
    </Container>
  );
}

export default Body;

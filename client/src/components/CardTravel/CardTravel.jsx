import { Button, Col, Container, Row } from 'react-bootstrap';
import './cardTravel.css';
import { TravelPicsGallery } from '../TravelPicsGallery/TravelPicsGallery';
export const CardTravel = ({data, openModal}) => {
  return (
    <Container className='card-travel'>
      <Row>
        <Col md={4}>
          <h3>{data.title} </h3>
          <p>{data.travel_date}</p>
          <h4>{data.country}</h4>
          <h4>{data.city}</h4>
          <h4>{data.description}</h4>
          <div className='d-flex gap-2'>
            <Button onClick={()=> openModal(data)}>Editar</Button>
            <Button>Eliminar</Button>
          </div>

        </Col>
        <Col md={8}>
          <TravelPicsGallery travel_id = {data.travel_id}/>
        </Col>
      </Row>
    </Container>
  )
}

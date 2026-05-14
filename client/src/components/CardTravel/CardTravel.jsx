import { Button, Col, Container, Row } from 'react-bootstrap';
import './cardTravel.css';
import { TravelPicsGallery } from '../TravelPicsGallery/TravelPicsGallery';
import { fetchAxios } from '../../helpers/axiosHelper';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const CardTravel = ({data, openModal}) => {
  const {token, travels,setTravels} = useContext(AuthContext);
  const delTravelLogic = async() => {
    try {
      await fetchAxios('/travels/delLogicTravel','PUT',{travel_id:data.travel_id}, token)
      setTravels(travels.filter(e=>e.travel_id !== data.travel_id))
    } catch (error) {
      console.log(error);
      
    }
  }
  const delTravelTotal = async() => {
   
  }
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
            <Button onClick={delTravelLogic}>Eliminar lógico</Button>
            <Button onClick={delTravelTotal}>Eliminar total</Button>
          </div>

        </Col>
        <Col md={8}>
          <TravelPicsGallery travel_id = {data.travel_id}/>
        </Col>
      </Row>
    </Container>
  )
}

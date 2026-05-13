import { Button, Form, Modal } from "react-bootstrap"
import { fetchAxios } from "../../helpers/axiosHelper";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const ModalEditTravel = ({show,handleClose, travelToEdit, handleChange}) => {
  
  const {token, travels, setTravels} = useContext(AuthContext);

  const onSubmit = async() => {

    try {
      //mandar esto a back
      let res = await fetchAxios('/travels/editTravel','PUT',travelToEdit,token);
      console.log(res);
      //actualizar los datos que se pintan en el front
      let temp = travels.map(elem => {
        if (elem.travel_id === travelToEdit.travel_id){
          return travelToEdit
        }
        else {
          return elem
        }
      })

      setTravels(temp);
      //cerrar el modal
      handleClose();
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Form>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter title" 
          onChange={handleChange}
          name="title"
          value={travelToEdit.title}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>País</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Country" 
          onChange={handleChange}
          name="country"
          value={travelToEdit.country}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>Ciudad</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="City" 
          onChange={handleChange}
          name="city"
          value={travelToEdit.city}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Description" 
          onChange={handleChange}
          name="description"
          value={travelToEdit.description}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha</Form.Label>
        <Form.Control 
          type="date" 
          placeholder="Date" 
          onChange={handleChange}
          name="travel_date"
          value={travelToEdit.travel_date}/>
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

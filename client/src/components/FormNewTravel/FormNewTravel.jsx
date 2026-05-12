import { useState } from "react";
import { Button, Form } from "react-bootstrap";


const initialValue = {
  title:"",
  country:"",
  city:"",
  description:"",
  date:""
}


export const FormNewTravel = ({ setShowForm }) => {

  const [newTravel, setNewTravel] = useState(initialValue);
  /* const [images, setImages] = useState(); */

  const handleChange = (e) => {
    const {name,value} = e.target;
    setNewTravel({...newTravel, [name]:value})
  }

  return (
    <Form className="w-50">
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Título</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter title" 
          onChange={handleChange}
          name="title"
          value={newTravel.title}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>País</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Country" 
          onChange={handleChange}
          name="country"
          value={newTravel.country}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>Ciudad</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="City" 
          onChange={handleChange}
          name="city"
          value={newTravel.city}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Description" 
          onChange={handleChange}
          name="description"
          value={newTravel.description}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label>Fecha</Form.Label>
        <Form.Control 
          type="date" 
          placeholder="Date" 
          onChange={handleChange}
          name="date"
          value={newTravel.date}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Sube tus imagenes</Form.Label>
        <Form.Control 
          type="file" 
          multiple />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary">
          Submit
        </Button>
        <Button 
          variant="primary"
          onClick={()=>setShowForm(false)}
          >
          Cancelar
        </Button>
      </div>
    </Form>
  );
};
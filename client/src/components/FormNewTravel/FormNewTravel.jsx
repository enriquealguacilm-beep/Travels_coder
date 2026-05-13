import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { fetchAxios } from "../../helpers/axiosHelper";
import { AuthContext } from "../../context/AuthContext";


const initialValue = {
  title:"",
  country:"",
  city:"",
  description:"",
  travel_date:""
}


export const FormNewTravel = ({ setShowForm }) => {

  const [newTravel, setNewTravel] = useState(initialValue);
  const [images, setImages] = useState(); 
  const {user,token, setTravels, travels} = useContext(AuthContext);

  const handleChange = (e) => {
    if (e.target.type === "file"){
      setImages(e.target.files)
    }
    else {
      const {name,value} = e.target;
      setNewTravel({...newTravel, [name]:value})
    }
    
  }

  const onSubmit = async() => {
    //validar campos con zod
    const newFormData = new FormData();
    newFormData.append("newTravel",JSON.stringify(newTravel));
    if(images){
      for(const elem of images){
        newFormData.append("img", elem);
      }
    }

    try {
      const res = await fetchAxios(`/travels/newTravel/${user.user_id}`, "POST", newFormData, token);
      console.log("-----------------------------------------",res);
      setShowForm(false);
      setTravels([...travels, {...newTravel, user_id: user.user_id, travel_id:res.data.travel_id}])
      
    } catch (error) {
      console.log(error);
      
    }

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
          name="travel_date"
          value={newTravel.travel_date}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Sube tus imagenes</Form.Label>
        <Form.Control 
          type="file" 
          onChange={handleChange}
          multiple />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button 
          variant="primary"
          onClick={onSubmit}
          >
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
import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AuthContext } from '../../../context/AuthContext'
import { fetchAxios } from '../../../helpers/axiosHelper'
import { useNavigate } from 'react-router'


const EditUser = () => {


  const {user,setUser, token} = useContext(AuthContext)
  const [editUser, setEditUser] = useState(user);
  const [image, setImage] = useState();

  const navigate = useNavigate();

  
  
  const handleChange = (e) => {
    if(e.target.type === "file"){
      setImage(e.target.files[0])
    } else{
      const { name,value} = e.target;
      setEditUser({...editUser, [name]: value});
      
      
    }
    
  }
  
  const onSubmit = async() => {
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(editUser));

    if(image){
      newFormData.append("img", image);
    }
    
    
    try {
      let res = await fetchAxios('/users/editUser', "PUT", newFormData, token);
      console.log(res.data);
      if(res.data.filename){
        setUser({...editUser, avatar:res.data.filename})
      }
      else{
        setUser(editUser)
      }
      navigate(user.role === 1 ? '/userProfile': '/adminProfile')
      
    } catch (error) {
      console.log(error);
      
    }
  }
   

  return (
    <div className="d-flex justify-content-center mt-5 ">

    <Form className="border border-1 rounded-2 p-4 w-25">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Nombre</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter name"
          onChange={handleChange}
          name="name"
          value={editUser.name}

          />
          {/* {errorsVal?.name && <p className="errMsg">{errorsVal.name}</p>} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastname">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter lastname"
          onChange={handleChange}
          name="lastname"
          value={editUser.lastname}

          />
          {/* {errorsVal?.lastname && <p className="errMsg">{errorsVal.lastname}</p>} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Dirección</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter address"
          onChange={handleChange}
          name="address"
          value={editUser.address?editUser.address:""}

          />
          {/* {errorsVal?.phone && <p className="errMsg">{errorsVal.phone}</p>} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter phone"
          onChange={handleChange}
          name="phone"
          value={editUser.phone?editUser.phone:""}

          />
          {/* {errorsVal?.email && <p className="errMsg">{errorsVal.email}</p>} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Sube Imágenes</Form.Label>
          <Form.Control
              type="file"
              onChange={handleChange}
          />
        </Form.Group>
      
      
      <div className="d-flex gap-2" >
        <Button onClick={onSubmit} >Submit</Button>
        <Button onClick={()=>navigate(user.role === 1 ? '/userProfile': '/adminProfile')}> Cancelar</Button>
      </div>
      
    </Form>
    </div>
  )
}

export default EditUser
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router"
import { validateForm } from "../../../../helpers/ValidateForms"
import { RegisterSchema } from "../../../../schemas/RegisterSchema"
import { fetchAxios } from "../../../../helpers/axiosHelper"


const initialValue = {
  name:"",
  lastname:"",
  email:"",
  password:"",
  repPassword:""
}

const RegisterPage = () => {

  const [register, setRegister] = useState(initialValue);
  const [errorsVal, setErrorsVal] = useState();
  const [otroError, setOtroError] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (e)=>{
    const {name,value} = e.target
    setRegister({...register,[name]:value});
  }


  const onSubmit = async() => {
    setErrorsVal({});
    setOtroError("");
    try {
      //1 validar
      validateForm(RegisterSchema,register)

      let url = "/users/register"
      //2 enviar al back
      let res = await fetchAxios(url,"POST",register);
      console.log(res);
      navigate('/login');
      
    } catch (error) {
      if (error.errType === "validator") {
        console.log("errores de validación");
        setErrorsVal(error)  
      }else if (error.response.data.errno === 1062){
        setOtroError("Email duplicado");
        
      }else {
        setOtroError("Ups, ha habido un error")
      }
      
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
          value={register.name}

          />
          {errorsVal?.name && <p className="errMsg">{errorsVal.name}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLastname">
        <Form.Label>Apellidos</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter lastname"
          onChange={handleChange}
          name="lastname"
          value={register.lastname}

          />
          {errorsVal?.lastname && <p className="errMsg">{errorsVal.lastname}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter email"
          onChange={handleChange}
          name="email"
          value={register.email}

          />
          {errorsVal?.email && <p className="errMsg">{errorsVal.email}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={register.password}

          />
          {errorsVal?.password && <p className="errMsg">{errorsVal.password}</p>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRepPassword">
        <Form.Label>Repite Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Repite Password"
          onChange={handleChange}
          name="repPassword"
          value={register.repPassword}

          />
          {errorsVal?.repPassword && <p className="errMsg">{errorsVal.repPassword}</p>}
      </Form.Group>
      
      <div className="d-flex gap-2" >
        <Button onClick={onSubmit} >Submit</Button>
        <Button onClick={()=> navigate(-1)}> Cancelar</Button>
      </div>
      <p className="errMsg">{otroError}</p>
      <p>¿Ya estás registrado? <Link to='/login'>Login aquí</Link></p>
    </Form>
    </div>
  )
}

export default RegisterPage
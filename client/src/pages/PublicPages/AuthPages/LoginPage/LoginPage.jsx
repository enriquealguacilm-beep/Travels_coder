
import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { fetchAxios } from '../../../../helpers/axiosHelper'
import { AuthContext } from '../../../../context/AuthContext'

const initialValue = {
  email:"",
  password:""
}

const LoginPage = () => {

  const [loginData, setLoginData] = useState(initialValue);
  const [errLogin, setErrLogin] = useState("");
  const {setUser, setToken} = useContext(AuthContext)
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData({...loginData, [name]:value});
  }


   const onSubmit = async() => {
    setErrLogin("")
    try {
      let url = "/users/login";
      let res = await fetchAxios(url,"POST",loginData);
      console.log(res);
      //guardo el token en el localStorage
      let tokenDelBack = res.data.token;
      localStorage.setItem("token", tokenDelBack);
      
      //pedir los datos del usuario
      
      let urlUser = "/users/userById";
      let resUser = await fetchAxios(urlUser,"GET", null, tokenDelBack);
      setUser(resUser.data.user);
      setToken(tokenDelBack);

      console.log(resUser);

      
    } catch (error) {
      console.log(error);
      if (error.status===401) {
        setErrLogin(error.response.data.message)
      }
      else {
        setErrLogin("Ups, ha habido algun error")
      }
    }

  } 

  return (
    <div className="d-flex justify-content-center mt-5 ">

    <Form className="border border-1 rounded-2 p-4 w-25">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Enter email"
          onChange={handleChange}
          name="email"
          value={loginData.email}

          />
          {/* {errorsVal?.email && <p className="errMsg">{errorsVal.email}</p>} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={loginData.password}

          />
          {/* {errorsVal?.password && <p className="errMsg">{errorsVal.password}</p>} */}
      </Form.Group>
     
      <p>{errLogin}</p>
      <div className="d-flex gap-2" >
        <Button onClick={onSubmit} >Submit</Button>
        <Button onClick={()=> navigate('/')}> Cancelar</Button>
      </div>
      <p>¿No estás registrado? <Link to='/register'>Regístrate aquí</Link></p>
    </Form>
    </div>
  )
}

export default LoginPage
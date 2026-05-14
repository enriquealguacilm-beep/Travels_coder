import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router"


export const PrivateRoutes = ({user, requiredRole}) => {
  //manejar la lógica de Auth dependiendo del role
  //administra rutas para admin o user
  const navigate = useNavigate();

  useEffect(()=>{
    if (user){

      if(user.role !== requiredRole) navigate('/')

    }else {
      navigate('/')
    }

  },[user])
  return (
    <>
     {user?.role == requiredRole ? <Outlet/>: <Navigate to= '/'/>}
    </>
  )
}

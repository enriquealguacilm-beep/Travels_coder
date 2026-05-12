import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { AuthContext } from "../context/AuthContext"

export const PublicRoutes = () => {
  //manejar la lógica de Auth dependiendo del role
  //pinta las rutas para los usuarios públicos

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      if (user.role ===1) navigate('/userProfile');
      if (user.role ===2) navigate('/adminDashboard');
    }
  },[user]);

  return (
    <>
      {!user && <Outlet />}
    </>
  )
}

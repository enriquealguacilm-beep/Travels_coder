import { Outlet } from "react-router"


export const PrivateRoutes = () => {
  //manejar la lógica de Auth dependiendo del role
  //administra rutas para admin o user


  return (
    <>
      <Outlet/>
    </>
  )
}

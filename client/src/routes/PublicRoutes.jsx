import { Outlet } from "react-router"

export const PublicRoutes = () => {
  //manejar la lógica de Auth dependiendo del role
  //pinta las rutas para los usuarios públicos
  return (
    <>
      <Outlet />
    </>
  )
}

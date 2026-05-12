import { Outlet } from "react-router"
import { NavbarUser } from "../components/NavbarUser/NavbarUser"


export const UserLayout = () => {
  return (
    <>
      <header>
        <NavbarUser/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        footer usuario noemal
      </footer>
    </>
  )
}

import { Outlet } from "react-router"
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin"

export const AdminLayout = () => {
  return (
    <>
      <header>
        <NavbarAdmin/>
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>
        footer admin
      </footer>
    </>
  )
}

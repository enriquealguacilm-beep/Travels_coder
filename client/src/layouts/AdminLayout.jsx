import { Outlet } from "react-router"

export const AdminLayout = () => {
  return (
    <>
      <header>
        Navbar admin
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

import { Outlet } from "react-router"


export const UserLayout = () => {
  return (
    <>
      <header>
        Navbar usuario
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

import { Outlet } from "react-router"
import { NavbarPublic } from "../components/NavbarPublic/NavbarPublic"
import { FooterPublic } from "../components/FooterPublic/FooterPublic"


export const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic/>
      </header>
      <main >
        <Outlet/>
      </main>
      <footer className="publicFooter">
        <FooterPublic/>
      </footer>
    </>
  )
}

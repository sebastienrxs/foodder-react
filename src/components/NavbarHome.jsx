import { Button, Navbar } from "flowbite-react"
import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.png"
function NavbarHome() {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand>
          <Link to="/" className="flex">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Foodder Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Foodder
            </span>
          </Link>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Link to="/signup" className="btn-nav-outline">
            Sign-up
          </Link>

          <Link to="/login" className="btn-nav">
            Login
          </Link>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {/* <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
      <main className="bg-gradient-to-b from-sky-100 to-sky-10">
        <Outlet />
      </main>
    </>
  )
}

export default NavbarHome

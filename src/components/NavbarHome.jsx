import { Navbar } from "flowbite-react"
import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.png"
function NavbarHome() {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Link to="/" className="flex">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="Foodder Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Foodder
          </span>
        </Link>
        <div className="flex md:order-2">
          <Link to="/signup" className="btn-nav-outline hover:text-purple-700">
            Sign-up
          </Link>

          <Link
            to="/login"
            className="btn-nav bg-purple-700 hover:bg-purple-900"
          >
            Login
          </Link>

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse></Navbar.Collapse>
      </Navbar>
      <main className="bg-gradient-to-b from-purple-100 to-purple-10">
        <Outlet />
      </main>
    </>
  )
}

export default NavbarHome

import { Navbar } from "flowbite-react"
import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.png"
function NavbarHome() {
  return (
    <>
      <nav class="bg-purple-100 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex">
            {/* <img src={logo} className="mr-3 h-6 sm:h-9" alt="Foodder Logo" /> */}
            <span className="self-center whitespace-nowrap text-xl font-bold text-gray-800 ">
              Foodder
            </span>
          </Link>

          <div class="flex md:order-2">
            <Link
              to="/signup"
              className="btn-nav-outline bg-transparent border-purple-700 border-2 hover:text-purple-700"
            >
              Sign-up
            </Link>
            <Link
              to="/login"
              className="btn-nav bg-purple-700 hover:bg-purple-900"
            >
              Login
            </Link>
          </div>
          <div
            class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          ></div>
        </div>
      </nav>

      <main className="bg-gradient-to-b from-purple-100 to-purple-10">
        <Outlet />
      </main>
    </>
  )
}

export default NavbarHome

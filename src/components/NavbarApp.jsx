import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

// Icons
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"

function Navbar() {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext)

  return (
    <>
      <nav className="fixed w-full z-50 top-0">
        <div className="mx-auto justify-center flex flex-row items-center bg-white text-gray-700 shadow h-full">
          <ul className="flex">
            <li className="hover:bg-gray-100">
              <Link
                to="/feed"
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <HomeIcon className=" text-gray-800 w-5 h-5" />
              </Link>
            </li>

            <li className="hover:bg-gray-100">
              <Link
                to="/feed"
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <SearchIcon className=" text-gray-800 w-5 h-5" />
              </Link>
            </li>

            <li className="hover:bg-gray-100">
              <Link
                to="/feed"
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <PlusIcon className=" text-gray-800 w-5 h-5" />
              </Link>
            </li>

            <li className="hover:bg-gray-100">
              <Link
                to="/feed"
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <UserCircleIcon className=" text-gray-800 w-5 h-5" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-24">
        <Outlet />
      </main>
    </>
  )
}

export default Navbar

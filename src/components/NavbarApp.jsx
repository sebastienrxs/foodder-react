import { useContext } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
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
  console.log("user from navbar:", user)
  const username = "bobby"
  return (
    <>
      <nav className="fixed w-full z-50 top-0">
        <div className="mx-auto py-1 justify-center flex flex-row items-center bg-white text-gray-700 shadow h-full">
          <ul className="flex">
            <li className="hover:bg-gray-100">
              <NavLink
                to="/feed"
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " rounded bg-gray-200" : "")
                }
              >
                <HomeIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
            </li>

            <li className="hover:bg-gray-100">
              <NavLink
                to="/search"
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <SearchIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
            </li>

            <li className="hover:bg-gray-100">
              <NavLink
                to="/new-post"
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <PlusIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
            </li>

            <li className="hover:bg-gray-100">
              <NavLink
                to={username}
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <UserCircleIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
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

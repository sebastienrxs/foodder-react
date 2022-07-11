import { NavLink, Outlet } from "react-router-dom"

// Icons
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline"

import { AuthContext } from "../context/auth.context"
import { useContext } from "react"

function Navbar() {
  const username = "bobby"
  const { removeToken } = useContext(AuthContext)
  console.log("removeToken:", removeToken)

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

            {/* <li className="hover:bg-gray-100">
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " rounded bg-gray-200" : "")
                }
              >
                <SearchIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
            </li> */}

            <li className="hover:bg-gray-100">
              <NavLink
                to="/new-post"
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " rounded bg-gray-200" : "")
                }
              >
                <PlusIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
            </li>

            <li className="hover:bg-gray-100">
              <NavLink
                to={`${username}/posts`}
                className={({ isActive }) =>
                  "h-16 px-6 flex justify-center items-center w-full" +
                  (isActive ? " rounded bg-gray-200" : "")
                }
              >
                <UserCircleIcon className=" text-gray-800 w-5 h-5" />
              </NavLink>
            </li>

            <li className="hover:bg-gray-100">
              <button
                onClick={removeToken}
                className="h-16 px-6 flex justify-center items-center w-full"
              >
                <LogoutIcon className=" text-gray-800 w-5 h-5" />
              </button>
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

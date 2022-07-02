import { useContext, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { API_URL } from "../utils/constants"

// Icons
import { UserIcon } from "@heroicons/react/solid"
import { LockOpenIcon } from "@heroicons/react/solid"

// Page
function LoginPage(props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { storeToken } = useContext(AuthContext)

  const navigate = useNavigate()

  // Handle inputs + submit
  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    axios({
      url: "/auth/login",
      baseURL: API_URL,
      method: "post",
      data: {
        username,
        password,
      },
    }).then((response) => {
      const { authToken } = response.data
      // let the AuthContext have the authToken
      storeToken(authToken)
      // redirect home
      navigate("/")
    })
  }

  return (
    <div className="LoginPage">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="flex mt-20">
        <div className="m-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg drop-shadow-md border-t-4 border-blue-500">
          <div className="self-center mb-6 text-xl font-medium text-gray-600 sm:text-2xl ">
            <h1>Login To Your Account</h1>
          </div>
          <div className="mt-8">
            <form onSubmit={handleLoginSubmit}>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <LockOpenIcon className="h-5 w-5 text-gray-500" />
                  </span>

                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <Link
                    to="/reset-password"
                    className="inline-flex text-xs underline text-gray-500 sm:text-sm  hover:text-gray-700 "
                  >
                    Forgot Your Password?
                  </Link>
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <Link
              to="/signup"
              className="inline-flex items-center text-xs text-center text-gray-500 hover:text-gray-700 "
            >
              <span className="ml-2">
                Don't have an account?{" "}
                <span className="underline">Sign up!</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

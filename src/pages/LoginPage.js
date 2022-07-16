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
  const [isLoading, setIsloading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const { isLoggedIn } = useContext(AuthContext)
  const { storeToken } = useContext(AuthContext)

  const navigate = useNavigate()

  // Handle inputs + submit
  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  // Redirect to Feed if user is logged in
  if (isLoggedIn) {
    navigate("/feed")
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setIsloading(true)

    axios({
      url: "/auth/login",
      baseURL: API_URL,
      method: "post",
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        const { authToken } = response.data
        // let the AuthContext have the authToken
        storeToken(authToken)
        setIsloading(false)
        navigate("/feed")
      })

      .catch((error) => {
        console.log(error)
        setErrorMessage(error.response.data.message)
        setIsloading(false)
      })
  }

  return (
    <div className="LoginPage pt-24">
      <div className="flex p-5">
        <div className="m-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg drop-shadow-md border-t-4 border-purple-500">
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
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                {!isLoading && (
                  <button
                    type="submit"
                    className="py-2 px-4  bg-purple-700 hover:bg-purple-800 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Login
                  </button>
                )}

                {/* Change button if isLoading */}
                {isLoading && (
                  <button
                    disabled
                    type="button"
                    className="py-2 px-4 bg-gray-400 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    <svg
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className=" items-center justify-center mt-6">
            <div>
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
            {errorMessage && (
              <div className="flex items-center justify-center mt-6">
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {errorMessage}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

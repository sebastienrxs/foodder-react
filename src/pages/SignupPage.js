import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Icons
import {
  UserIcon,
  LockOpenIcon,
  MailIcon,
  IdentificationIcon,
} from "@heroicons/react/solid"

// Page
function SignupPage(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  // Handle inputs + submit
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleName = (e) => setName(e.target.value)
  const handleUsername = (e) => setUsername(e.target.value)

  const handleSignupSubmit = (e) => {
    e.preventDefault()

    axios({
      url: "/auth/signup",
      baseURL: API_URL,
      method: "post",
      data: {
        email,
        password,
        name,
        username,
      },
    })
      .then((response) => {
        console.log("data:", response.data)
        navigate("/login")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className="SignupPage">
      <div className="flex mt-20">
        <div className="m-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg drop-shadow-md border-t-4 border-blue-500">
          <div className="self-center mb-6 text-xl font-medium text-gray-600 sm:text-2xl ">
            <h1>Create a new account</h1>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSignupSubmit}>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <IdentificationIcon className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleName}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <MailIcon className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
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
                <div className="flex ml-auto"></div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Sign-up
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <Link
              to="/login"
              className="inline-flex items-center text-xs text-center text-gray-500 hover:text-gray-700 "
            >
              <span className="ml-2">
                Already have an account?{"  "}
                <span className="underline">Login!</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage

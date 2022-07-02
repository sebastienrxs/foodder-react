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
  const [email, setEmail] = useState("")
  const [showSuccessMessage, setSuccessMessage] = useState(false)
  const [isLoading, setIsloading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { storeToken } = useContext(AuthContext)

  const navigate = useNavigate()

  // Handle inputs + submit
  const handleEmail = (e) => setEmail(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsloading(true)

    axios({
      url: "/reset-password",
      baseURL: API_URL,
      method: "post",
      data: {
        email,
      },
    }).then((response) => {
      const { authToken } = response.data
      // let the AuthContext have the authToken
      storeToken(authToken)
      setIsloading(false)
      setSuccessMessage(true)
    })
  }

  return (
    <div className="LoginPage">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="flex mt-20">
        <div className="m-auto flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg drop-shadow-md border-t-4 border-blue-500">
          <div className="self-center mb-6 text-xl font-medium text-gray-600 sm:text-2xl ">
            <h1>Reset your password</h1>
          </div>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <label className="mb-4 text-gray-700">Enter your email</label>
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    <UserIcon className="h-5 w-5 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="flex w-full">
                {!isLoading && (
                  <button
                    type="submit"
                    className="py-2 px-4 mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Reset password
                  </button>
                )}

                {/* Change button if isLoading */}
                {isLoading && (
                  <button
                    disabled
                    type="button"
                    class="py-2 px-4 mt-2 bg-gray-400 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    <svg
                      role="status"
                      class="inline w-4 h-4 mr-3 text-white animate-spin"
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
          {showSuccessMessage && (
            <div className="flex items-center justify-center mt-6">
              <div
                class="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span class="font-medium">Password reset successful!</span>{" "}
                Check your email and click on the link to create a new password.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage

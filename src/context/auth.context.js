import axios from "axios"
import { createContext, useCallback, useEffect, useState } from "react"
import { API_URL, TOKEN_STORAGE_KEY } from "../utils/constants"

// make a new React context
const AuthContext = createContext()

const AuthContextWrapper = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  // console.log("user:", user)

  const storeToken = (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    authenticateUser()
  }

  const removeToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    authenticateUser()
  }

  const getToken = useCallback(() => {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  }, [])

  const authenticateUser = useCallback(() => {
    const token = getToken()

    if (!token) {
      setIsLoading(false)
      setUser(null)
      setIsLoggedIn(false)
      return
    }

    setIsLoading(true)

    axios({
      method: "get",
      baseURL: API_URL,
      url: "/auth/verify",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUser(response.data)
        // console.log("response.data:", response.data)
        setIsLoggedIn(true)
        setIsLoading(false)
      })
      .catch(() => {
        setUser(null)
        setIsLoggedIn(false)
        setIsLoading(false)
      })
  }, [getToken])

  useEffect(authenticateUser, [authenticateUser])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        removeToken,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextWrapper }

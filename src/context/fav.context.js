import axios from "axios"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { API_URL } from "../utils/constants"
import { AuthContext } from "./auth.context"

// make a new React context
const FavContext = createContext()

const FavContextWrapper = ({ children }) => {
  const [userFavorites, setFavorites] = useState([])
  console.log("userFavorites:", userFavorites)
  const { getToken, user } = useContext(AuthContext)

  const getUserFavorites = useCallback(() => {
    const storedToken = getToken()
    if (user) {
      axios
        .get(`${API_URL}/favorites/${user.payload.username}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setFavorites(response.data))
        .catch((error) => console.log(error))
    }
  }, [user])

  useEffect(getUserFavorites, [getUserFavorites])

  return (
    <FavContext.Provider
      value={{
        userFavorites,
        getUserFavorites,
      }}
    >
      {children}
    </FavContext.Provider>
  )
}

export { FavContext, FavContextWrapper }

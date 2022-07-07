import axios from "axios"
import { API_URL } from "../utils/constants"

//Context
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Icons
import { BookmarkIcon } from "@heroicons/react/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid"

// Component
const ArticleInteraction = ({ _id, isFav, getAllArticles, setFavorites }) => {
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()
  const { getUserFavorites } = useContext(FavContext)

  function handleCreateFav(e) {
    e.preventDefault()

    axios
      .post(
        `${API_URL}/favorites`,
        {
          article: _id,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        getAllArticles()
        getUserFavorites()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  function handleDeleteFav(e) {
    e.preventDefault()

    axios
      .delete(
        `${API_URL}/favorites/${_id}`,

        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        getAllArticles()
        getUserFavorites()
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div>
      {isFav ? (
        <button onClick={handleDeleteFav}>
          <BookmarkIconSolid className="h-6 w-6 inline text-purple-500" />
        </button>
      ) : (
        <button onClick={handleCreateFav}>
          <BookmarkIcon className="h-6 w-6 inline text-purple-500" />
        </button>
      )}
    </div>
  )
}

export default ArticleInteraction

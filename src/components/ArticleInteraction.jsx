import axios from "axios"
import { API_URL } from "../utils/constants"

//Context
import { FavContext } from "../context/fav.context"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"

// Icons
// import { faStar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons"
import { BookmarkIcon } from "@heroicons/react/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid"

// Component
const ArticleInteraction = ({ _id, isFav }) => {
  console.log("isFav:", isFav)
  console.log("_id:", _id)
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()
  console.log("storedToken:", storedToken)

  // const [isFavState, setIsFavState] = useState(isFav)
  // console.log(">>>>>>>>>> isFavorite:", isFavState)

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
        console.log("response.data:", response.data)

        // setIsFavState(true)
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
        console.log("response.data:", response.data)

        // setIsFavState(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <div className="article-commands">
      <FontAwesomeIcon icon={faHeart} className="icon" />
      <FontAwesomeIcon icon={faComment} className="icon" />

      {isFav ? (
        <button onClick={handleDeleteFav}>
          <BookmarkIconSolid className="h-5 w-5 mx-3 inline text-green-500" />
        </button>
      ) : (
        <button onClick={handleCreateFav}>
          <BookmarkIcon className="h-5 w-5 inline mx-3 text-gray-500" />
        </button>
      )}
    </div>
  )
}

export default ArticleInteraction

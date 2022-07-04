//Context
import { FavContext } from "../context/fav.context"
import { useContext, useEffect } from "react"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons"
// import { faStar } from "@fortawesome/free-regular-svg-icons"
import { BookmarkIcon } from "@heroicons/react/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid"

// Component
const ArticleInteraction = ({ _id, isFav }) => {
  function createFav() {
    //...
  }
  function deleteFav() {
    //...
  }
  return (
    <div className="article-commands">
      <FontAwesomeIcon icon={faHeart} className="icon" />
      <FontAwesomeIcon icon={faComment} className="icon" />

      {isFav ? (
        <button onClick={deleteFav}>
          <BookmarkIconSolid className="h-5 w-5 mx-3 inline text-green-500" />
        </button>
      ) : (
        <button onClick={createFav}>
          <BookmarkIcon className="h-5 w-5 inline mx-3 text-gray-500" />
        </button>
      )}
    </div>
  )
}

export default ArticleInteraction

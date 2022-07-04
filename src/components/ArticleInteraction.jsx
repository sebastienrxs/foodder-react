//Context
import { FavContext } from "../context/fav.context"
import { useContext, useEffect } from "react"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBookmark,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons"
// import { faStar } from "@fortawesome/free-regular-svg-icons"
import { BookmarkIcon } from "@heroicons/react/outline"
import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/solid"

const ArticleInteraction = ({ _id, isFav }) => {
  // console.log(">>>> _id as props:", _id)

  const { userFavorites } = useContext(FavContext)
  // console.log(">>>> userFavorites:", userFavorites)

  const isFavorited = false

  const checkIsFav = () => {
    if (userFavorites.length === 0) {
      const isFavorited = userFavorites.some(
        (element) => element.article._id === _id
      )
    }

    console.log("isFavorited:", isFavorited)
  }

  useEffect(checkIsFav, [userFavorites])

  return (
    <div className="article-commands">
      <FontAwesomeIcon icon={faHeart} className="icon" />
      {/* <FontAwesomeIcon icon={faStar} className="icon" /> */}
      <FontAwesomeIcon icon={faComment} className="icon" />
      {/* <FontAwesomeIcon icon={faBookmark} className="icon" /> */}

      {isFav ? (
        <BookmarkIconSolid className="h-5 w-5 inline text-red-500" />
      ) : (
        <BookmarkIcon className="h-5 w-5 inline text-blue-500" />
      )}
    </div>
  )
}

export default ArticleInteraction

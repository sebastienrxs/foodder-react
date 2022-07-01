//Context
import { FavContext } from "../context/fav.context"
import { useContext } from "react"

//FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faBookmark,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons"
// import { faStar } from "@fortawesome/free-regular-svg-icons"

const ArticleInteraction = ({ _id }) => {
  const { userFavorites } = useContext(FavContext)

  const isFavorited = userFavorites.some((elem) => _id === elem.article._id)
  console.log("isFavorited:", isFavorited)

  return (
    <div className="article-commands">
      <FontAwesomeIcon icon={faHeart} className="icon" />
      {/* <FontAwesomeIcon icon={faStar} className="icon" /> */}
      <FontAwesomeIcon icon={faComment} className="icon" />
      <FontAwesomeIcon icon={faBookmark} className="icon" />
    </div>
  )
}

export default ArticleInteraction

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBookmark,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const ArticleInteraction = () => {
  return (
    <div className="article-interactions">
      <div className="article-commands">
        <FontAwesomeIcon icon={faHeart} className="icon" />
        <FontAwesomeIcon icon={faComment} className="icon" />
        <FontAwesomeIcon icon={faBookmark} className="icon" />
      </div>
      <div className="article-location">France</div>
    </div>
  )
}

export default ArticleInteraction

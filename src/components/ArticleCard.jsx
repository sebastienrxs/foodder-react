import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import ArticleInteraction from "./ArticleInteraction"

function ArticleCard({ title, description, author, image, _id, city }) {
  function handleFavorite() {
    //...
  }
  return (
    <article className="ArticleCard">
      <div className="author-info">
        <div className="author-img">
          <img src={author.image} alt="" />
        </div>
        <div className="author-name">{author.username}</div>
      </div>
      <picture className="article-img">
        <img src={image} alt="" />
      </picture>
      <div className="article-interactions">
        <ArticleInteraction />
        <div className="article-location">
          {city.cityName}, {city.country.countryName}
        </div>
      </div>

      <div className="article-text">
        <h3>{title}</h3>
        <div className="article-description">{description}</div>
      </div>
    </article>
  )
}

export default ArticleCard

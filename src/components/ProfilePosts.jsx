import React from "react"
import { Link } from "react-router-dom"
import ArticlePreview from "./ArticlePreview"

const ProfilePosts = ({ articles }) => {
  return (
    <div className="flex flex-wrap w-96">
      {articles.map((article) => {
        return (
          <article className="grow box-border">
            <Link to={"/articles/" + article._id}>
              <img
                className="rounded shadow-md object-cover w-48 h-48"
                src={article.image}
                alt=""
              />
            </Link>
          </article>
        )
        //  <ArticlePreview key={article._id} {...article} />
      })}
    </div>
  )
}

export default ProfilePosts

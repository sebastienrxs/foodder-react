import React from "react"
import { Link } from "react-router-dom"

const ArticlePreview = ({ image, _id }) => {
  return (
    <div>
      <Link to={"/articles/" + _id}>
        <img className="w-24 h-24 m-5" src={image} alt="" />
      </Link>
    </div>
  )
}

export default ArticlePreview

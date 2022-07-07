import { Link } from "react-router-dom"
import ArticleInteraction from "./ArticleInteraction"
import {
  CheckCircleIcon,
  LocationMarkerIcon,
  PencilAltIcon,
} from "@heroicons/react/solid"
import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

function ArticleCard({
  title,
  description,
  author,
  image,
  _id,
  city,
  isFav,
  getAllArticles,
  setFavorites,
}) {
  const { user } = useContext(AuthContext)
  console.log("user:", user)
  return (
    <article className=" max-w-md rounded-lg shadow border mb-8">
      <div className=" ml-2 mt-2 mb-4 flex justify-between">
        <div className="author-name">
          <Link to={`/${author?.username}/posts`}>
            <div className="flex text-left">
              <div className=" mt-2 rounded-full h-10 w-10 bg-gray-00 border-violet-600 border-2 flex items-center justify-center overflow-hidden">
                <img src={author?.image} alt="" />
              </div>
              <div>
                <div className="pt-1 ml-2 font-semibold text-md block">
                  {" "}
                  {author?.name}{" "}
                  <span>
                    <CheckCircleIcon className="h-4 text-violet-600 inline ml-1" />
                  </span>
                </div>
                <div className=" ml-2 text-sm block"> @{author?.username}</div>
              </div>
            </div>
          </Link>
        </div>

        {user.payload.username === author.username && (
          <Link to={`/articles/edit/${_id}`} className="justify-end px-4 pt-2">
            <PencilAltIcon className="h-6 text-violet-600 inline ml-1" />
          </Link>
        )}
      </div>
      <picture className="article-img">
        <img src={image} className=" h-96 w-96 object-cover" alt="" />
      </picture>

      <div className="mx-4 mt-2">
        <div className="flex justify-between">
          <ArticleInteraction
            _id={_id}
            isFav={isFav}
            getAllArticles={getAllArticles}
            setFavorites={setFavorites}
          />
          <Link to={`/feed/?countries=${city.country.countryCca2}`}>
            <div className=" inline-block bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-1 mt-1 rounded">
              <LocationMarkerIcon className="mr-1 -mt-1 w-4 h-4 inline-block" />
              {city.country.countryName}
            </div>
          </Link>
        </div>

        <div className="text-left mt-2 mb-4">
          <h3 className="text-md font-bold mb-2">{title}</h3>
          <div className="article-description">{description}</div>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard

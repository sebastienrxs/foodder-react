import React from "react"
import { Link } from "react-router-dom"
import { LocationMarkerIcon } from "@heroicons/react/outline"
import { LockClosedIcon } from "@heroicons/react/outline"

const ProfilePosts = ({ articles }) => {
  return !articles ? (
    <p>loading</p>
  ) : (
    <div className="flex flex-wrap w-96">
      {articles.map((article) => {
        return (
          <Link to={`/articles/${article._id}`} key={article.title}>
            <article className=" text-left mb-14 bg-white rounded-lg">
              <img
                className="rounded-lg object-cover w-96 h-52"
                src={article.image}
                alt=""
              />
              <span className=" inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 pr-2.5 pl-1 py-1 mt-4 rounded ">
                <LocationMarkerIcon className="mr-1 -mt-1 w-4 h-4 inline-block" />
                {article?.city.country.countryName}
              </span>
              {article.private && (
                <span className=" inline-block bg-rose-100 text-rose-800 text-xs font-semibold mr-2 pr-2.5 pl-1 py-1 mt-2 rounded ">
                  <LockClosedIcon className="mr-1 -mt-1 w-4 h-4 inline-block" />
                  Private
                </span>
              )}

              <h5 className="mt-3 text-l truncate font-bold tracking-tight text-gray-900 dark:text-white">
                {article.title}
              </h5>
            </article>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts

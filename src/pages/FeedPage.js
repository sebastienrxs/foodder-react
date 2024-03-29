import { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ArticleCard from "../components/ArticleCard"
import { useSearchParams } from "react-router-dom"
import SkeletonArticleFeed from "../components/SkeletonArticleFeed"

function FeedPage() {
  // Contexts
  const { userFavorites } = useContext(FavContext)
  const { getToken } = useContext(AuthContext)

  // States
  const [searchParams] = useSearchParams()
  const [articles, setArticles] = useState([])
  const [articleWithFavorites, setFavorites] = useState([])
  const [isLoading, setisLoading] = useState(true)

  // Get articles and set them
  const getAllArticles = useCallback(() => {
    const storedToken = getToken()

    const params = Object.fromEntries(searchParams.entries())

    axios
      .get(`/articles`, {
        params,
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setArticles(response.data)
      })
      .catch((error) => console.log(error))
  }, [searchParams, getToken])

  // Set articles with key "isFav"
  const checkIsFav = useCallback(() => {
    const favoritesId = userFavorites
      .map((x) => {
        return x?.article?._id
      })
      .filter(Boolean)
    const loadedFavs = articles.map((element) => {
      element.isFav = favoritesId.includes(element._id)
      return element
    })
    setFavorites(loadedFavs)
    setisLoading(false)
  }, [articles, userFavorites])

  useEffect(() => {
    getAllArticles()
  }, [getAllArticles])

  useEffect(() => {
    checkIsFav()
  }, [checkIsFav])

  return (
    <>
      {isLoading ? (
        <section className="FeedPage relative mt-24 w-max m-auto">
          <SkeletonArticleFeed />
        </section>
      ) : (
        <section className="FeedPage relative mt-24 w-max m-auto">
          {articleWithFavorites.map((article) => {
            return (
              <ArticleCard
                key={article._id}
                {...article}
                getAllArticles={getAllArticles}
                setFavorites={setFavorites}
              />
            )
          })}
        </section>
      )}
    </>
  )
}

export default FeedPage

import { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ArticleCard from "../components/ArticleCard"
import { useParams, useSearchParams } from "react-router-dom"

function ArticlesDetailsPage() {
  // Contexts
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)
  const { userFavorites } = useContext(FavContext)
  const { getToken } = useContext(AuthContext)
  const { articleId } = useParams()

  // States
  const [searchParams, setSearchParams] = useSearchParams()
  const [articles, setArticles] = useState([])
  console.log("articles:", articles)
  // all articles, with added key "isFav"
  const [articleWithFavorites, setFavorites] = useState([])

  // Get articles and set them
  const getAllArticles = useCallback(() => {
    const storedToken = getToken()

    axios
      .get(`${API_URL}/articles/${articleId}`, {
        params: searchParams,
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setArticles([response.data])
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
  }, [articles, userFavorites])

  useEffect(() => {
    getAllArticles()
  }, [getAllArticles])

  useEffect(() => {
    checkIsFav()
  }, [checkIsFav])

  return (
    <>
      {articles.length === 0 ? (
        <div>Loading</div>
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

export default ArticlesDetailsPage

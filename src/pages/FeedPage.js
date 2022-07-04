import { useCallback, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ArticleCard from "../components/ArticleCard"

function FeedPage() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)
  const { userFavorites } = useContext(FavContext)
  const [articles, setArticles] = useState([])
  const [articleWithFavorites, setFavorites] = useState([])
  // console.log("articles:", articles)
  const { getToken } = useContext(AuthContext)

  const getAllArticles = () => {
    const storedToken = getToken()
    // console.log("storedToken:", storedToken)

    axios
      .get(`${API_URL}/articles`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setArticles(response.data)
        // console.log("response.data:", response.data)
      })
      .catch((error) => console.log(error))
  }
  const checkIsFav = () => {
    const favoritesId = userFavorites
      .map((x) => {
        return x?.article?._id
      })
      .filter(Boolean)
    // console.log("FAVORITES ID", favoritesId)
    const loadedFavs = articles.map((element) => {
      element.isFav = favoritesId.includes(element._id)
      return element
    })
    console.log("------------------------------->>>>>>", loadedFavs)
    setFavorites(loadedFavs)
  }

  useEffect(() => {
    getAllArticles()
  }, [])

  useEffect(() => {
    checkIsFav()
  }, [articles])

  return (
    <>
      {articles.length === 0 ? (
        <div>Loading</div>
      ) : (
        <section className="FeedPage relative mt-24 w-max m-auto">
          {articleWithFavorites.map((article) => {
            console.log("article:", article)
            // if (!article.article) return
            return <ArticleCard key={article._id} {...article} />
          })}
        </section>
      )}
    </>
  )
}

export default FeedPage

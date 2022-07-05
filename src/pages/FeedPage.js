import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ArticleCard from "../components/ArticleCard"

function FeedPage() {
  // Contexts
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)
  const { userFavorites } = useContext(FavContext)
  const { getToken } = useContext(AuthContext)

  // States
  const [articles, setArticles] = useState([])
  // all articles, with added key "isFav"
  const [articleWithFavorites, setFavorites] = useState([])

  // Get articles and set them
  const getAllArticles = () => {
    const storedToken = getToken()

    axios
      .get(`${API_URL}/articles`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setArticles(response.data)
      })
      .catch((error) => console.log(error))
  }

  // Set articles with new key "isFav"
  const checkIsFav = () => {
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
            return <ArticleCard key={article._id} {...article} />
          })}
        </section>
      )}
    </>
  )
}

export default FeedPage

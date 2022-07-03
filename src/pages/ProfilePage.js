import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"
import ArticleCard from "../components/ArticleCard"
console.log("API_URL:", API_URL)

function FeedPage() {
  const { user, isLoggedIn } = useContext(AuthContext)
  console.log("user:", user)
  const { username } = user.payload
  console.log("username:", username)
  const { userFavorites } = useContext(FavContext)

  const [articles, setArticles] = useState([])
  // console.log("articles:", articles)
  const { getToken } = useContext(AuthContext)

  const getAllArticles = () => {
    const storedToken = getToken()
    // console.log("storedToken:", storedToken)

    axios
      .get(`${API_URL}/articles`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setArticles(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllArticles()
  }, [])

  return (
    <section className="FeedPage relative mt-24 w-max m-auto">
      {articles.map((article) => {
        // console.log("article:", article)
        return <ArticleCard key={article._id} {...article} />
      })}
    </section>
  )
}

export default FeedPage

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
        console.log("response.data:", response.data)
      })
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

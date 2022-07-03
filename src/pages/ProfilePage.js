import { useCallback, useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

//Components
import ArticleCard from "../components/ArticleCard"
import ArticlePreview from "../components/ArticlePreview"

function FeedPage() {
  const { user, isLoggedIn } = useContext(AuthContext)
  const { username } = useParams()
  const { userFavorites } = useContext(FavContext)

  const [articles, setUserArticles] = useState([])
  console.log("articles:", articles)
  const { getToken } = useContext(AuthContext)

  const getUserArticles = () => {
    const storedToken = getToken()
    // console.log("storedToken:", storedToken)

    axios
      .get(`${API_URL}/articles/user/${username}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setUserArticles(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserArticles()
  }, [])

  return (
    <section className="FeedPage relative mt-24 w-max m-auto">
      <div>{}</div>
      {articles.map((article) => {
        console.log("article:", article)
        return <ArticlePreview key={article._id} {...article} />
      })}
    </section>
  )
}

export default FeedPage

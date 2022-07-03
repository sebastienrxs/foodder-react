import { useCallback, useContext, useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ArticlePreview from "../components/ArticlePreview"
import ProfileHeader from "../components/ProfileHeader"
import ProfileTabs from "../components/ProfileTabs"

function FeedPage() {
  // hooks
  const { user, isLoggedIn } = useContext(AuthContext)
  const { userFavorites } = useContext(FavContext)
  const { getToken } = useContext(AuthContext)
  const { username } = useParams()
  const [articles, setUserArticles] = useState([])

  // API call
  const getUserArticles = () => {
    const storedToken = getToken()

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
      <ProfileHeader />

      <ProfileTabs />

      {articles.map((article) => {
        return <ArticlePreview key={article._id} {...article} />
      })}
    </section>
  )
}

export default FeedPage

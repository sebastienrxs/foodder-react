import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"
import ArticleCard from "../components/ArticleCard"

function FeedPage() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext)

  const [articles, setArticles] = useState([])
  const { getToken } = useContext(AuthContext)

  const getAllArticles = useCallback(() => {
    const storedToken = getToken()

    axios
      .get(`${API_URL}/api/articles`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setArticles(response.data))
      .catch((error) => console.log(error))
  }, [getToken])

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllArticles()
  }, [getAllArticles])

  return (
    <div className="">
      <h1>FeedPage</h1>
      {/* <p>You are logged in as {user.payload.username} </p> */}

      {articles.map((article) => (
        <ArticleCard key={article._id} {...article} />
      ))}
    </div>
  )
}

export default FeedPage

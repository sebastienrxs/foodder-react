import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ArticleCard from "../components/ArticleCard"
import ArticleCardSingle from "../components/ArticleCardSingle"
import { AuthContext } from "../context/auth.context"
import { API_URL } from "../utils/constants"

const ArticlesDetailsPage = () => {
  const [article, setArticle] = useState([])
  console.log("article from setArticle:", article)
  const { articleId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const { user, isLoggedIn } = useContext(AuthContext)
  const { getToken } = useContext(AuthContext)

  const getOneArticle = () => {
    const storedToken = getToken()
    // console.log("storedToken:", storedToken)

    axios
      .get(`${API_URL}/articles/${articleId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setArticle(response.data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getOneArticle()
  }, [])

  console.log("articleId:", articleId)

  if (isLoading) return <p>Loading...</p>
  return <ArticleCardSingle key={article._id} {...article} />
}

export default ArticlesDetailsPage

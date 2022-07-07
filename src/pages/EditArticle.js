import { useCallback, useContext, useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ArticleCard from "../components/ArticleCard"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import SkeletonArticleFeed from "../components/SkeletonArticleFeed"

function EditArticle() {
  // Contexts
  const { userFavorites } = useContext(FavContext)
  const { getToken } = useContext(AuthContext)
  const { articleId } = useParams()
  const navigate = useNavigate()

  // States
  const [searchParams] = useSearchParams()
  const [article, setArticle] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Get article and set it
  const getOneArticleById = useCallback(() => {
    const storedToken = getToken()

    axios
      .get(`${API_URL}/articles/${articleId}`, {
        params: searchParams,
        baseURL: API_URL,
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneArticle = response.data
        setTitle(oneArticle.title)
        setDescription(oneArticle.description)
        // setArticle([response.data])
        setisLoading(false)
      })
      .catch((error) => console.log(error))
  }, [searchParams, getToken])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const storedToken = getToken()
    console.log("storedToken from patch:", storedToken)

    const requestBody = { title, description }

    axios
      .patch(`${API_URL}/articles/${articleId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/articles/${articleId}`)
      })
  }

  useEffect(() => {
    getOneArticleById()
  }, [articleId])

  return (
    <>
      {isLoading ? (
        <section className="FeedPage relative mt-24 w-max m-auto">
          <SkeletonArticleFeed />
        </section>
      ) : (
        <section className="FeedPage relative mt-24 w-max m-auto">
          <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={handleFormSubmit}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block"
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block"
              />

              <button type="submit" className="block btn-nav">
                Update Project
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default EditArticle

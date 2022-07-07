import axios from "axios"
import { useCallback, useContext, useEffect, useState } from "react"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"

// Components
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import SkeletonArticleFeed from "../components/SkeletonArticleFeed"

function EditArticle() {
  // Contexts
  const { getToken } = useContext(AuthContext)
  const { articleId } = useParams()
  const navigate = useNavigate()

  // States
  const [searchParams] = useSearchParams()
  const [isLoading, setisLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Get article
  const getOneArticleById = useCallback(() => {
    const storedToken = getToken()

    // API Call
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

  // Handle submit
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
        <section className="FeedPage relative mt-24 max-w-md m-auto">
          <div className="EditProjectPage">
            <form onSubmit={handleFormSubmit}>
              <div className="mx-auto my-9 flex flex-col w-full max-w-md my-30 px-4 py-8 bg-white rounded-lg drop-shadow-md border-t-4 border-blue-100">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <div className="mb-3 mt-3">
                  <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="my-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Update your post
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default EditArticle

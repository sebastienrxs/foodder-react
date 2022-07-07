import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"
import { FavContext } from "../context/fav.context"

// Components
import ProfileHeader from "../components/ProfileHeader"
import ProfileTabs from "../components/ProfileTabs"
import ProfilePosts from "../components/ProfilePosts"
import SkeletonProfile from "../components/SkeletonProfile"

function ProfilePage() {
  // hooks
  const { user, isLoggedIn } = useContext(AuthContext)
  const { userFavorites } = useContext(FavContext)
  const { getToken } = useContext(AuthContext)
  const { username } = useParams()
  const [articles, setUserArticles] = useState([])

  const [userProfile, setUserProfile] = useState({})
  const [numberOfArticles, setNumberOfArticles] = useState(0)

  // loading
  const [isUserProfileLoading, setisUserProfileLoading] = useState(true)

  // API - get user
  const getUserProfile = () => {
    const storedToken = getToken()

    axios
      .get(`${API_URL}/user/${username}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserProfile(response.data)
        setisUserProfileLoading(false)
      })

      .catch((error) => console.log(error))
  }

  // API - get user's articles
  const getUserArticles = () => {
    const storedToken = getToken()

    axios
      .get(`${API_URL}/articles/user/${username}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserArticles(response.data)
        setNumberOfArticles(response.data.length)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserArticles()
  }, [])

  useEffect(() => {
    getUserProfile()
  }, [])

  return isUserProfileLoading ? (
    <section className="FeedPage relative mt-24 w-max m-auto">
      <SkeletonProfile />
    </section>
  ) : (
    <section className="ProfilePage relative mt-24 w-max m-auto">
      <ProfileHeader {...userProfile} numberOfArticles={numberOfArticles} />
      <ProfileTabs />
      <ProfilePosts articles={articles} />
    </section>
  )
}

export default ProfilePage

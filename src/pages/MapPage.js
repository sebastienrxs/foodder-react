import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../utils/constants"

// Context
import { AuthContext } from "../context/auth.context"

// Components
import ProfileHeader from "../components/ProfileHeader"
import ProfileTabs from "../components/ProfileTabs"
import ProfilePageMap from "../components/ProfilePageMap"

function MapPage() {
  // hooks
  const { getToken } = useContext(AuthContext)
  const { username } = useParams()
  const [userProfile, setUserProfile] = useState({})
  const [numberOfArticles] = useState(0)

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
  useEffect(() => {
    getUserProfile()
  }, [])

  return isUserProfileLoading ? (
    <p>loading</p>
  ) : (
    <section className="FeedPage relative mt-24 w-max m-auto">
      <ProfileHeader {...userProfile} numberOfArticles={numberOfArticles} />
      <ProfileTabs />
      <ProfilePageMap />
    </section>
  )
}

export default MapPage

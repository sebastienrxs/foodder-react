import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from "../utils/constants"
import { Wrapper } from "@googlemaps/react-wrapper"
import mapStyles from "../components/profilePageMapStyles"

// Context
import { AuthContext } from "../context/auth.context"

const libraries = ["places"]
const mapContainerStyle = {
  height: "390px",
  width: "390px",
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}
const center = {
  lat: 48.866667,
  lng: 2.333333,
}

const ProfilePageMap = () => {
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()
  const { username } = useParams()

  const [articles, setUserArticles] = useState([])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  // API - get user's articles
  const getUserArticles = () => {
    axios
      .get(`${API_URL}/articles/user/${username}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setUserArticles(response.data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getUserArticles()
  }, [])

  return (
    <div>
      <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={1}
          center={center}
          options={options}
        >
          {articles.length > 0 &&
            articles.map((article) => {
              console.log(article.city)
              return (
                <Marker
                  key={article.city.cityName}
                  position={{
                    lat: article.city.lat,
                    lng: article.city.lng,
                  }}
                />
              )
            })}
        </GoogleMap>
      </Wrapper>
    </div>
  )
}

export default ProfilePageMap

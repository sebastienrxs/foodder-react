import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, Navigate } from "react-router-dom"
import AddressAutocomplete from "../components/AddressAutocomplete"

function HomePage() {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isLoggedIn) {
    // If the user is logged in, navigate to FeedPage
    return <Navigate to="/feed" />
  }

  return (
    <main>
      <h1>HomePage</h1>
    </main>
  )
}

export default HomePage

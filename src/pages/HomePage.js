import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, Navigate } from "react-router-dom"

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
      <Link to="/login">LOGIN </Link>
      <Link to="/signup">SIGNUP</Link>
    </main>
  )
}

export default HomePage

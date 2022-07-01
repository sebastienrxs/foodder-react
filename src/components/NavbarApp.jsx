import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext)

  return (
    <>
      <nav>
        <Link to="/feed">Feed </Link>
        <Link to="/new-post">New post </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navbar

import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext)

  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/login">Login </Link>
        <Link to="/signup">Sign Up </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navbar

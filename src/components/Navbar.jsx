import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">Home</Link>

      {!isLoggedIn && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
          <Outlet />
        </>
      )}
    </nav>
  )
}

export default Navbar

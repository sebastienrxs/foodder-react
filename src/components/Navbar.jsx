import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {
  const { isLoggedIn, user, removeToken } = useContext(AuthContext)

  return (
    <>
      {isLoggedIn ? (
        <>
          <nav>
            <Link to="/">Home Is LoggedIn</Link>
          </nav>
          <main>
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </nav>
          <main>
            <Outlet />
          </main>
        </>
      )}
      {/* <Link to="/">Home</Link> */}

      {/* {!isLoggedIn && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      <main>
        <Outlet />
      </main> */}
    </>
  )
}

export default Navbar

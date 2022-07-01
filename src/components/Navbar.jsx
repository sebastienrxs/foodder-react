import { Link, Outlet } from "react-router-dom"

function Navbar() {
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

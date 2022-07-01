import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, Navigate } from "react-router-dom"
import AddressAutocomplete from "../components/AddressAutocomplete"

function NewArticlePage() {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <main>
      <h1>NewArticlePage</h1>
      <AddressAutocomplete />
    </main>
  )
}

export default NewArticlePage

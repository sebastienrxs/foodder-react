import { useContext } from "react"
import AddressAutocomplete from "../components/AddressAutocomplete"
import { AuthContext } from "../context/auth.context"

function NewArticlePage() {
  const { isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <p>loading...</p>
  }

  return (
    <main>
      <AddressAutocomplete />
    </main>
  )
}

export default NewArticlePage

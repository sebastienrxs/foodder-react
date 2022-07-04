import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, Navigate } from "react-router-dom"
import SearchByCountry from "../components/SearchByCountry"

function SearchPage() {
  return (
    <>
      <div>SEARCH BAR</div>
      <SearchByCountry></SearchByCountry>
    </>
  )
}

export default SearchPage

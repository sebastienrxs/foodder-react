import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/auth.context"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import SearchCountryBar from "../components/SearchCountryBar"

function SearchPage() {
  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()
  // Declare state for the search bar component
  const [searchParams, setSearchParams] = useSearchParams()
  const [countriesList, setCountriesList] = useState([])

  const selectedCountries = searchParams.get("countries")?.split(",")
  const setSelectedCountries = (values) => {
    setSearchParams({ countries: values.join(",") })
  }

  // // Get articles and set them
  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/articles/`, {
  //       params: searchParams,
  //       headers: { Authorization: `Bearer ${storedToken}` },
  //     })
  //     .then((response) => {
  //       setArticlesToDisplay(response.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, [searchParams, storedToken])
  // SearchParamas
  return (
    <>
      <div>SEARCH BAR</div>
      <SearchCountryBar
        setCountriesList={setCountriesList}
        countriesList={countriesList}
        setSelectedCountries={setSelectedCountries}
        selectedCountries={selectedCountries}
      ></SearchCountryBar>
    </>
  )
}

export default SearchPage

import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import SearchCountryBar from "../components/SearchCountryBar"

function SearchPage() {
  // Declare state for the search bar component
  const [searchParams, setSearchParams] = useSearchParams()
  const [countriesList, setCountriesList] = useState([])

  const selectedCountries = searchParams.get("countries")?.split(",") || []
  const setSelectedCountries = (values) => {
    setSearchParams({ countries: values.join(",") })
  }

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

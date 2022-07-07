import React, { useContext, useEffect } from "react"
import { Multiselect } from "multiselect-react-dropdown"
import axios from "axios"
import { API_URL } from "../utils/constants"
import { AuthContext } from "../context/auth.context"

import "../components/SearchCountryBar.css"

const SearchCountryBar = ({
  countriesList,
  setCountriesList,
  selectedCountries,
  setSelectedCountries,
}) => {
  const { getToken } = useContext(AuthContext)

  console.log("countriesList:", countriesList)

  // GET THE LIST OF COUNTRIES WHICH THE USER CAN FILTER ON
  useEffect(() => {
    const storedToken = getToken()
    axios
      .get(`${API_URL}/articles/countries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCountriesList(
          response.data.map((el) => {
            return { value: el.cca2, label: el._id }
          })
        )
      })
      .catch((e) => {
        console.log(e)
      })
  }, [getToken, setCountriesList])

  const updateValues = (values) => {
    console.log(
      "e:",
      values.map((x) => x.value)
    )
    setSelectedCountries(values.map((x) => x.value))
  }

  return (
    <>
      <div className="countries-list">
        <Multiselect
          className="select"
          isObject={true}
          options={countriesList}
          displayValue="label"
          selectedValues={countriesList.filter((x) =>
            selectedCountries.includes(x.value)
          )}
          onSelect={updateValues}
          onRemove={updateValues}
        />
      </div>
    </>
  )
}

export default SearchCountryBar

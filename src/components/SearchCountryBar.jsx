import React, { useState, useContext, useEffect } from "react"
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
  const storedToken = getToken()

  // GET THE LIST OF COUNTRIES WHICH THE USER CAN FILTER ON
  useEffect(() => {
    axios
      .get(`${API_URL}/articles/countries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCountriesList(
          response.data.map((el) => {
            return el._id
          })
        )
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>
      <div className="countries-list">
        <Multiselect
          className="select"
          isObject={false}
          options={countriesList}
          selectedValues={selectedCountries}
          onSelect={(values) => {
            console.log("e:", values)
            setSelectedCountries([...values])
          }}
          onRemove={setSelectedCountries}
        />
      </div>
    </>
  )
}

export default SearchCountryBar

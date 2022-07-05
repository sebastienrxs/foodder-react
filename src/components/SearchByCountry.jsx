import React, { useState, useContext, useEffect } from "react"
import { Multiselect } from "multiselect-react-dropdown"
import axios from "axios"
import { API_URL } from "../utils/constants"
import { AuthContext } from "../context/auth.context"

import "../components/SearchByCountry.css"

const SearchByCountry = () => {
  const [countriesList, setCountriesList] = useState([])
  console.log("countriesList:", countriesList)

  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()

  // GET THE LIST OF COUNTRIES WHICH THE USER CAN FILTER ON
  useEffect(() => {
    axios
      .get(`${API_URL}/articles/countries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.data:", response.data)
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

  // const handleSubmit =  () => {
  //   // Filter content
  // } -> In the Page and not in the component.

  return (
    <>
      <div className="countries-list">
        <Multiselect
          className="select"
          isObject={false}
          options={countriesList}
          onSelect={(e) => {
            console.log(e)
          }}
          onRemove={(e) => {
            console.log(e)
          }}
        />
      </div>
      {/* <button onClick={handleSubmit}>Filter by countries</button> */}
    </>
  )
}

export default SearchByCountry

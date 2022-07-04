import React, { useState, useContext, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../utils/constants"
import { AuthContext } from "../context/auth.context"

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

  return (
    <>
      <div className="countries-list">
        {countriesList.map((country, index) => {
          return (
            <div key={index}>
              <input value={country} type="checkbox" />
              <span>{country}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default SearchByCountry

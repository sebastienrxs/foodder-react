import React, { useState, useContext } from "react"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import axios from "axios"
import { API_URL } from "../utils/constants"
import { AuthContext } from "../context/auth.context"

// const baseUrl = process.env.REACT_APP_BACKEND_URL

function AddressAutocomplete() {
  // States for Google API's input -> Search for city
  const [address, setAddress] = useState("")
  const [data, setData] = useState({})

  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()

  // States for the other inputs of the form
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
    isPrivate: false,
  })

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)

    const adressComponent = results[0].address_components
    const myObject = {}

    // get country and cca2 info
    for (let value of adressComponent) {
      if (value.types[0].toLowerCase() === "country") {
        myObject.country = value.long_name
        myObject.cca2 = value.short_name
      }
    }
    // Get city name info
    for (let element of adressComponent) {
      if (element.types[0].toLowerCase() === "locality") {
        myObject.city = element.long_name
      }
    }
    setData(myObject)
    setAddress(value)
  }

  // Send data to the backend with axios
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const { country, cca2, city } = data

      const fd = new FormData()
      fd.append("title", formValues.title)
      fd.append("description", formValues.description)
      fd.append("image", formValues.image)
      fd.append("private", formValues.isPrivate)
      fd.append("country", country)
      fd.append("cca2", cca2)
      fd.append("city", city)

      axios
        .post(`${API_URL}/articles`, fd, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log("response.data:", response.data)
        })
        .catch((error) => console.log(error))
    } catch (err) {
      console.log(err)
    }
  }

  // Gonstrain Google Maps API predictions to certain place types
  const searchOptions = {
    types: ["locality", "sublocality", "administrative_area_level_3"],
  }

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <form onSubmit={handleSubmit}>
            {/* Post Title */}
            <div className="form-input">
              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }}
                placeholder="Title of your dish"
              />
            </div>

            {/* Description */}
            <div className="form-input">
              <input
                type="text"
                name="description"
                value={formValues.description}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }}
                placeholder="Write a nice description :)"
              />
            </div>

            {/* Image to upload */}
            <div className="form-input">
              <input
                type="file"
                name="image"
                files={formValues.image}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.files[0],
                  })
                }}
              />
            </div>

            {/* Is the post private ? */}
            <div className="form-input">
              <label htmlFor="">Is your post private?</label>
              <input
                type="checkbox"
                name="isPrivate"
                value={formValues.isPrivate}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.checked,
                  })
                }}
              />
            </div>

            {/* City - Google API */}
            <div className="form-input">
              <input
                {...getInputProps({ placeholder: "Type city or address" })}
              />
            </div>

            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                }

                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                )
              })}
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default AddressAutocomplete

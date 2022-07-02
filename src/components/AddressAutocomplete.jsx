import React, { useState } from "react"
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete"
import axios from "axios"
import { API_URL } from "../utils/constants"

// const baseUrl = process.env.REACT_APP_BACKEND_URL

function AddressAutocomplete() {
  // States for Google API's input -> Search for city
  const [address, setAddress] = useState("")
  const [data, setData] = useState({})

  // States for the other inputs of the form
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
    isPrivate: false,
  })
  console.log("formValues:", formValues)

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
      console.log(data)
      e.preventDefault()

      const fd = new FormData()
      const dataToSend = {
        ...data,
        title: formValues.title,
        description: formValues.description,
        image: formValues.image,
        private: formValues.isPrivate,
      }
      console.log("dataToSend:", dataToSend)

      const res = await axios.post(
        "http://localhost:5005/api/articles",
        dataToSend
      )
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
                src={formValues.image}
                onChange={(e) => {
                  console.log(">>>>>>", e.target.value)
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
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
            <button>Submit</button>
          </form>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default AddressAutocomplete

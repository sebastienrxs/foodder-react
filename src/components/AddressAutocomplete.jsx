import axios from "axios"
import { useContext, useState } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { AuthContext } from "../context/auth.context"
import { API_URL } from "../utils/constants"

// const baseUrl = process.env.REACT_APP_BACKEND_URL

function AddressAutocomplete() {
  // States for Google API's input -> Search for city
  const [address, setAddress] = useState("")
  const [latLngApi, setLatLngApi] = useState({})
  const [data, setData] = useState({})

  // States for the other inputs of the form
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    image: "",
    isPrivate: false,
  })

  // States for displaying errors
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { getToken } = useContext(AuthContext)
  const storedToken = getToken()

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setLatLngApi(latLng)

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
    fd.append("lat", latLngApi.lat)
    fd.append("lng", latLngApi.lng)

    axios
      .post(`${API_URL}/articles`, fd, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.data:", response.data)
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.errorMessage)
      })
  }

  // Constrain Google Maps API predictions to certain place types
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* YOUR TITLE */}
            <div className="mx-auto my-9 flex flex-col w-full max-w-md my-30 px-4 py-8 bg-white rounded-lg drop-shadow-md border-t-4 border-blue-100">
              <div>
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
                  id="small-input"
                  placeholder="Your post title"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>

              {/* YOUR DESCRIPTION */}
              <div className="mb-3 mt-3">
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
                  id="large-input"
                  placeholder="Write a nice description"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></input>
              </div>

              {/* DROP YOUR FILE */}
              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                name="image"
                files={formValues.image}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.files[0],
                  })
                }}
              ></input>

              {/* IS PRIVATE ? */}
              <label
                htmlFor="default-toggle"
                className="relative inline-flex items-center mb-4 cursor-pointer my-4"
              >
                <input
                  type="checkbox"
                  id="default-toggle"
                  className="sr-only peer"
                  name="isPrivate"
                  value={formValues.isPrivate}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.checked,
                    })
                  }}
                ></input>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Is your post private?
                </span>
              </label>
              <div>
                {/* City - Google API */}
                <div className="">
                  <input
                    className="bg-gray-50 text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    {...getInputProps({
                      placeholder: "Type city or address",
                    })}
                  />
                </div>

                <div>
                  {loading ? <div>...loading</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    }

                    return (
                      <div
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    )
                  })}
                </div>
                <button
                  type="submit"
                  className="my-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Create your post
                </button>
              </div>
            </div>
          </form>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default AddressAutocomplete

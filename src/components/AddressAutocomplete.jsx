import axios from "axios"
import { useContext, useState } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { API_URL } from "../utils/constants"

// const baseUrl = process.env.REACT_APP_BACKEND_URL

function AddressAutocomplete() {
  // States for Google API's input -> Search for city
  const [address, setAddress] = useState("")
  const [latLngApi, setLatLngApi] = useState({})
  const [data, setData] = useState({})
  const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate()

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
    setIsloading(true)
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

    // API Call
    axios
      .post(`${API_URL}/articles`, fd, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("response.data:", response.data)
        setIsloading(false)
        navigate("/feed")
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

                {!isLoading && (
                  <button
                    type="submit"
                    className="my-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    Create your post
                  </button>
                )}

                {isLoading && (
                  <button
                    disabled
                    type="button"
                    className="my-6 text-white bg-gray-400 hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    <svg
                      role="status"
                      className="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Creating your post...
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </PlacesAutocomplete>
    </div>
  )
}

export default AddressAutocomplete

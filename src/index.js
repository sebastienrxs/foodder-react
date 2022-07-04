import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthContextWrapper } from "./context/auth.context"
import { createRoot } from "react-dom/client"
import { FavContext } from "./context/fav.context"
import { FavContextWrapper } from "./context/fav.context"
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextWrapper>
        <FavContextWrapper>
          <App />
        </FavContextWrapper>
      </AuthContextWrapper>
    </Router>
  </React.StrictMode>
)
// ReactDOM.render(
//   document.getElementById("root")
// )

reportWebVitals()

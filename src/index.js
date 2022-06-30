import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthContextWrapper } from "./context/auth.context"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()

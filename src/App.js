import logo from "./logo.svg"
import "./App.css"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import FeedPage from "./pages/FeedPage"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Navbar />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="feed" element={<FeedPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

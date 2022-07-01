import logo from "./logo.svg"
import "./App.css"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import FeedPage from "./pages/FeedPage"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import NavbarApp from "./components/NavbarApp"
import NewArticlePage from "./pages/NewArticlePage"
import IsPrivate from "./components/IsPrivate"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="" element={<HomePage />} />
        </Route>
        <Route path="/" element={<NavbarApp />}>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="feed"
            element={
              <IsPrivate>
                <FeedPage />
              </IsPrivate>
            }
          />
          <Route
            path="new-post"
            element={
              <IsPrivate>
                <NewArticlePage />
              </IsPrivate>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App

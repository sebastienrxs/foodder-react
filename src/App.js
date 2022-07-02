import "./App.css"
import { Routes, Route } from "react-router-dom"

// Pages
import NewArticlePage from "./pages/NewArticlePage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import FeedPage from "./pages/FeedPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

// Components
import NavbarApp from "./components/NavbarApp"
import IsPrivate from "./components/IsPrivate"
import NavbarHome from "./components/NavbarHome"

function App() {
  return (
    <div className="App bg-gradient-to-b from-sky-100 to-sky-10">
      <Routes>
        <Route path="/" element={<NavbarHome />}>
          <Route path="" element={<HomePage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route path="/" element={<NavbarApp />}>
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

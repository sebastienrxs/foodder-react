import "./App.css"
import { Routes, Route } from "react-router-dom"

// Pages
import NewArticlePage from "./pages/NewArticlePage"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import FeedPage from "./pages/FeedPage"
import ProfilePage from "./pages/ProfilePage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ArticleDetailsPage from "./pages/ArticleDetailsPage"
import SearchPage from "./pages/SearchPage"

// Components
import NavbarApp from "./components/NavbarApp"
import IsPrivate from "./components/IsPrivate"
import NavbarHome from "./components/NavbarHome"
import MapPage from "./pages/MapPage"
import EditArticle from "./pages/EditArticle"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<NavbarHome />}
          className="bg-gradient-to-b from-sky-100 to-sky-10"
        >
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
          <Route
            path=":username/posts"
            element={
              <IsPrivate>
                <ProfilePage />
              </IsPrivate>
            }
          />
          <Route
            path=":username/map"
            element={
              <IsPrivate>
                <MapPage />
              </IsPrivate>
            }
          />
          <Route
            path="articles/:articleId"
            element={
              <IsPrivate>
                <ArticleDetailsPage />
              </IsPrivate>
            }
          />
          <Route
            path="articles/edit/:articleId"
            element={
              <IsPrivate>
                <EditArticle />
              </IsPrivate>
            }
          />
          <Route
            path="search"
            element={
              <IsPrivate>
                <SearchPage />
              </IsPrivate>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App

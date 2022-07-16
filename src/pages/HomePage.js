import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Link, Navigate } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/react/outline"
import PostExample from "../assets/galette-post.jpg"

function HomePage() {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  // if (isLoading) {
  //   return <p>loading...</p>
  // }

  if (isLoggedIn) {
    // If the user is logged in, navigate to FeedPage
    return <Navigate to="/feed" />
  }

  return (
    <>
      <section className="bg-gradient-to-b from-purple-100 to-purple-10">
        <div className="py-8 px-4 mx-auto pt-20 max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Share and discover the best culinary experiences.
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Share the best things you ate. Discover your next favorite dish.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="btn-icon bg-purple-700 hover:bg-purple-900"
            >
              Create an account
              <ChevronRightIcon className=" ml-4 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-8 items-center text-left py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
          <img
            className=" w-10/12 rounded border shadow-lg dark:hidden"
            src={PostExample}
            alt="post example"
          />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Discover your next favorite dish
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
              Foodder helps you discover dishes and new places to eat all over
              the world.
            </p>
          </div>
        </div>
      </section>

      <footer className="p-4 bg-white text-center rounded-lg shadow dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <p>
            Foodder was built during a coding bootcamp by{" "}
            <a
              href="https://www.linkedin.com/in/sebastienrs/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Sébastien Roux-Savelli
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/hugo-cornu/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Hugo Cornu
            </a>
            .
          </p>
          <p className="pt-2">
            View the{" "}
            <a
              href="https://github.com/sebastienrxs/foodder-react"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              GitHub repo
            </a>
            .
          </p>
        </span>
      </footer>
    </>
  )
}

export default HomePage

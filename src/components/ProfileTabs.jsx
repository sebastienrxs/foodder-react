import React from "react"
import { MapIcon, CollectionIcon } from "@heroicons/react/outline"
import { Link } from "react-router-dom"

const ProfileTabs = () => {
  return (
    <section className="border-b border-gray-200 mb-6 ">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
        <li className="mr-2 grow">
          <Link
            to="#"
            className="inline-flex grow p-4 rounded-t-lg border-b-2 active group"
            aria-current="page"
          >
            <CollectionIcon className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            Posts
          </Link>
        </li>
        <li className="mr-2 grow">
          <Link
            to="#"
            className="inline-flex grow p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group"
          >
            <MapIcon className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500" />
            Map
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default ProfileTabs

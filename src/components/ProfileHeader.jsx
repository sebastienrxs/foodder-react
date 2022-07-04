import userEvent from "@testing-library/user-event"
import React, { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import profilePlaceholder from "../assets/profile-placeholder.jpg"

const ProfileHeader = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      <div class="max-w-lg w-96 mb-6 bg-white rounded-lg border border-gray-200 shadow-md ">
        <div class="flex justify-end px-4 pt-4"></div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="mb-3 w-24 h-24 border-solid border-blue-600 border-2 rounded-full shadow-lg"
            src={user.payload.image ? user.payload.image : profilePlaceholder}
            alt="user"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 ">
            {user.payload.name}
          </h5>
          {/* <span class="text-sm text-gray-500 ">
            Visual Designer
          </span> */}
          <div class="flex mt-4 space-x-10 lg:mt-6">
            <div>
              <div className="text-gray-700">27</div>
              <div className="text-gray-500 text-sm">posts</div>
            </div>
            <div>
              <div className="text-gray-700">12</div>
              <div className="text-gray-500 text-sm">countries visited</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileHeader

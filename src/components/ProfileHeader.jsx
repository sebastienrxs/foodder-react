import profilePlaceholder from "../assets/profile-placeholder.jpg"

const ProfileHeader = ({ image, username, name, numberOfArticles }) => {
  return (
    <>
      <div className="max-w-lg w-96 mb-6 bg-white rounded-lg border border-gray-200 shadow-md ">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 w-24 h-24 border-solid border-blue-600 border-2 rounded-full shadow-lg"
            src={image ? image : profilePlaceholder}
            alt="user"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 ">{name}</h5>
          <div className="flex mt-4 space-x-10 lg:mt-6">
            <div>
              <div className="text-gray-700">{numberOfArticles}</div>
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

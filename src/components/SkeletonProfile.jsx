import ContentLoader, { Instagram } from "react-content-loader"

import React from "react"

const SkeletonProfile = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="201" cy="153" r="55" />
      <rect x="27" y="234" rx="0" ry="0" width="347" height="43" />
    </ContentLoader>
  )
}

export default SkeletonProfile

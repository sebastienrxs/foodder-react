import ContentLoader, { Instagram } from "react-content-loader"

import React from "react"

const SkeletonProfile = (props) => {
  return (
    <ContentLoader viewBox="0 0 500 280" height={280} width={500} {...props}>
      <circle cx="230" cy="50" r="30" />
      <rect x="160" y="90" rx="0" ry="0" width="140" height="25" />
    </ContentLoader>
  )
}

export default SkeletonProfile

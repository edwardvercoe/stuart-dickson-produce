import React from 'react'

import TwoImagesApart from './TwoImagesApart'
import TwoImagesSideBySide from './TwoImagesSideBySide'

type TwoImagesProps = {
  data: any
}

const TwoImages = ({ data }: TwoImagesProps) => {
  if (!data) return null

  if (data?.variation == 'sideBySide') {
    return <TwoImagesSideBySide data={data} />
  }
  return <TwoImagesApart data={data} />
}

export default TwoImages

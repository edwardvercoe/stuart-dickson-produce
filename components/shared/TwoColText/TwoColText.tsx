import React from 'react'

import TwoColTextHalf from './TwoColTextHalf'
import TwoColTextThirds from './TwoColTextThirds'

const TwoColText = ({ data }) => {
  if (!data) return null

  if (data?.variation == '30/70') {
    return <TwoColTextThirds data={data} />
  }
  return <TwoColTextHalf data={data} />
}

export default TwoColText

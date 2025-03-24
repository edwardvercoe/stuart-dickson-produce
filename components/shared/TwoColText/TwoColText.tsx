import React from 'react'

import type { TwoColText as TwoColTextType } from '@/types/sanity.types'

import TwoColTextHalf from './TwoColTextHalf'
import TwoColTextThirds from './TwoColTextThirds'

type TwoColTextProps = {
  data: TwoColTextType
}

const TwoColText = ({ data }: TwoColTextProps) => {
  if (!data) return null

  if (data.variation === '30/70') {
    return <TwoColTextThirds data={data} />
  }
  return <TwoColTextHalf data={data} />
}

export default TwoColText

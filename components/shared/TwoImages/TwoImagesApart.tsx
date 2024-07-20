import React from 'react'

type TwoImagesProps = {
  data: any
}

const TwoImagesApart = ({ data }: TwoImagesProps) => {
  const { variation = 'apart', imageLeft, imageRight } = data
  return (
    <section>
      <div>TwoImages {variation}</div>
    </section>
  )
}

export default TwoImagesApart

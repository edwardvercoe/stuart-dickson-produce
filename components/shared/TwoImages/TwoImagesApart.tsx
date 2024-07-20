import React from 'react'

type TwoImagesProps = {
  data: any
}

const TwoImagesApart = ({ data }: TwoImagesProps) => {
  const { imageLeft, imageRight, text } = data
  return (
    <section>
      <div>TwoImagesApart.tsx</div>
    </section>
  )
}

export default TwoImagesApart

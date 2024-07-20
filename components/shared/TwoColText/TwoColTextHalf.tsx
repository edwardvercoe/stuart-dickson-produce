import React from 'react'

type TwoColTextProps = {
  data: any
}

const TwoColTextHalf = ({ data }: TwoColTextProps) => {
  const { variation, leftColumn, rightColumn } = data

  return (
    <section className="py-10">
      <div>TwoColTextHalf</div>
    </section>
  )
}

export default TwoColTextHalf

import React from 'react'

export default function SectionTitle({text}) {
  return (
    <div className='pt-10'>
        <h2 className="text-3xl font-medium tracking-wider my-10 pb-5">
        {text}
      </h2>
    </div>
  )
}

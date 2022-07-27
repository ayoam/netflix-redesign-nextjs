import React from 'react'

const Section = ({styleName,children}) => {
  return (
    <section className="bg-black">
      <div className="bg-netGray h-2"/>
      <div className={"py-14 text-white w-[80%] max-w-screen-2xl mx-auto"+" "+styleName}>
        {children}
      </div>
    </section>
  )
}

export default Section
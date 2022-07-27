import React from 'react'
import Link from 'next/link'

const emailVerification = () => {
  return (
    <>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-5/6 max-w-2xl md:w[800px] mx-auto'>
        <h1 className='text-3xl text-center mb-6 font-bold'>Email verification</h1>
        <p className='text-lg  bg-orange-500 bg-opacity-80 p-4 border-l-4 font-light mb-4'>You will need to verify your email to complete registration</p>
        <p className='text-sm mb-4'>An email has been sent to you with a link to verify your account. if you have not received the email after few minutes , please check your spam folder</p>
        <p className='text-sm'>Already verified your email ? <span className='underline'><Link href="/login"><a>Log in</a></Link></span></p>
      </div>

    </>
  )
}

export default emailVerification
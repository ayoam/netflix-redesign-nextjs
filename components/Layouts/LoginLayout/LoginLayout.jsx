import React from 'react'
import logo from '../../../public/images/logo_v7.png'
import Image from 'next/image'
import HomeFooter from '../../HomeFooter/HomeFooter'
import Link from 'next/link';

const LoginLayout = ({children}) => {
  return (
    <>
      <div className="block bg-black sm:bg-hero-bg-img bg-cover bg-center w-full h-auto sm:h-[130vh] relative"  id="hero_section">
        <div className="hidden sm:block sm:absolute bg-black bg-opacity-50 z-20
        top-0 right-0 w-full h-full">
        </div>

        <div className={'sm:absolute top-0 right-0 w-full h-full z-30 text-white max-w-screen-2xl sm:left-1/2 sm:transform sm:-translate-x-1/2'}>
          <nav className="py-6 px-6 sm:py-8 sm:px-12">                 
            <ul className="flex flex-row justify-between items-start">
              <li className="w-24 sm:w-auto"><Link href="/"><a><Image src={logo} alt="logo"/></a></Link></li>
            </ul>  
          </nav>
        </div>

        <div className="sm:absolute top-[12%] sm:left-1/2 sm:transform sm:-translate-x-1/2 z-50">
          {children}
        </div>
      </div>
      <HomeFooter/>
    </>
  )
}

export default LoginLayout
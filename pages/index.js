import React,{useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Button from '../components/UI/Button'
import logo from '../public/images/logo_v7.png'
import tv from '../public/images/tv.png'
import mobile from '../public/images/mobile-0819.jpg'
import download from '../public/images/download-icon.gif'
import devicePile from '../public/images/device-pile.png'
import kidsImg from '../public/images/kids_img.png'
import poster from '../public/images/boxshot.png'
import HomeEmailInput from '../components/GetStartedEmail/GetStartedEmail';
import Section from '../components/UI/Section'
import FaqItem from '../components/FaqItem/FaqItem'
import { useState } from 'react'
import { useRouter } from 'next/router';
import HomeFooter from '../components/HomeFooter/HomeFooter'
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../firebase'

export default function Index() {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      user.emailVerified && router.push("/home");
    }
  },[user,router])

  const getEmailHandler = (email)=>{
    console.log(email);
  }

  const signInClickHandler = ()=>{
    router.push('/login')
  }

  return (
    <>
      <Head>
        <title>Netflix - Watch TV Shows Online, Watch Movies Online</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/nficon2016.ico" />
      </Head>

      {/* Hero section */}
      <div className="block bg-hero-bg-img bg-cover bg-center w-full h-screen relative"  id="hero_section">
        <div className="absolute bg-black bg-opacity-30 z-20
        top-0 right-0 w-full h-full">
        </div>
        <div className="absolute bg-gradient-to-t from-black via-transparent to-black z-10
        top-0 right-0 w-full h-full">
        </div>

        <div className={'absolute top-0 right-0 w-full h-full z-30 text-white max-w-screen-2xl left-1/2 transform -translate-x-1/2'}>
          <nav className="py-6 px-6 sm:py-8 sm:px-12">                 
            <ul className="flex flex-row justify-between items-start">
            <Link href="/"><a><li className="w-24 sm:w-auto"><Image src={logo} alt="logo"/></li></a></Link>
              <li><Button text="Sign In" onClick={signInClickHandler} styleName="bg-redBtn"/></li>
            </ul>  
          </nav>

          <div className="w-5/6 max-w-2xl md:w[800px] mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" id="hero_text">
            <div className="text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 md:text-white">Unlimited movies, TV shows, and more.</h1>
              <h2 className="text-lg sm:text-2xl mb-4">Watch anywhere. Cancel anytime.</h2>
              <h3 className="text-md w-5/6 mx-auto sm:w-auto sm:text-lg">Ready to watch? Enter your email to create or restart your membership.</h3>
            </div>
            <HomeEmailInput onGetStartedClick={getEmailHandler}/>
          </div>
        </div>
      </div>

      {/* Enjoy section */}
      <Section styleName="flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-[40%]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-start">Enjoy on your TV.</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-center lg:text-start">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
        </div>
        <div className="relative flex justify-end w-full md:w-[550px] mx-auto lg:mx-0">
          <div className="w-full z-20">
              <Image src={tv} alt="tv"/>
          </div>
          <video className="w-[73%] absolute right-[14%] bottom-[26%]" autoPlay muted loop playsInline>
              <source src="./videos/video-tv-0819.mp4"
               type="video/mp4"/>
          </video>
        </div>
      </Section>

      {/* Download section */}
      <Section styleName="flex flex-col lg:flex-row-reverse justify-center items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-start">Download your shows to watch offline.</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-center lg:text-start">Save your favorites easily and always have something to watch.</h2>
        </div>
        <div className="w-full lg:w-1/2 flex justify-start mx-auto">
          <div className="md:w-auto lg:w-2/3 mx-auto lg:mx-0 relative">
            <Image src={mobile} alt="download"/>
            <div className="absolute bg-black border-2 border-gray-600 rounded-xl p-2  w-full bottom-8">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                  <div className="w-14">
                    <Image src={poster} alt="poster"/>
                  </div>
                  <div className="flex flex-col justify-center ml-3">
                    <h2 className="font-bold">Stranger Things</h2>
                    <p className="text-sm text-sky-500">Downloading...</p>
                  </div>
                </div>
                <div className="float-right w-16">
                    <Image src={download} alt="download"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Watch everywhere section */}
      <Section styleName="flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-[40%]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-start">Watch everywhere.</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-center lg:text-start">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</h2>
        </div>
        <div className="relative flex justify-end w-full md:w-[550px] mx-auto lg:mx-0">
          <div className="w-full z-20">
              <Image src={devicePile} alt="device pile"/>
          </div>
          <video className="w-[62%] absolute right-[20%] bottom-[44%]" autoPlay muted loop playsInline>
              <source src="./videos/video-devices.m4v"
               type="video/mp4"/>
          </video>
        </div>
      </Section>

      {/* kids section */}
      <Section styleName="flex flex-col lg:flex-row-reverse justify-center items-center">
        <div className="w-full lg:w-1/2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-start">Create profiles for kids.</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-center lg:text-start">Send kids on adventures with their favorite characters in a space made just for them???free with your membership.</h2>
        </div>
        <div className="w-full lg:w-1/2 flex justify-start mx-auto">
          <div className="md:w-auto lg:w-5/6 mx-auto lg:mx-0 float-left">
            <Image src={kidsImg} alt="download"/>
          </div>
        </div>
      </Section>

      {/*FAQ section*/}
      <Section>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-12 mt-6 text-center'>Frequently Asked Questions</h1>
        <div>
          <FaqItem title="What is Netflix?" content="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\nYou can watch as much as you want, whenever you want without a single commercial ??? all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"/>
          <FaqItem title="How much does Netflix cost?"  content="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from MAD65 to MAD125 a month. No extra costs, no contracts."/>
          <FaqItem title="Where can I watch?"  content="Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\nYou can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."/>
          <FaqItem title="How do I cancel?"  content="Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees ??? start or stop your account anytime."/>
          <FaqItem title="What can I watch on Netflix?"  content="Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."/>
          <FaqItem title="Is Netflix good for kids?" content="The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.\nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don???t want kids to see."/>
        </div>
        <div className="max-w-2xl md:w[800px] mx-auto mt-10">
          <h3 className="text-md mx-auto sm:w-auto sm:text-lg text-center  mb-4">Ready to watch? Enter your email to create or restart your membership.</h3>
          <HomeEmailInput onGetStartedClick={getEmailHandler}/>
        </div>
      </Section>
      <HomeFooter/>
    </>
  )
}

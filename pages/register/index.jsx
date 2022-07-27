import React,{useEffect} from 'react'
import Head from 'next/head'
import LoginLayout from '../../components/Layouts/LoginLayout/LoginLayout'
import SignUp from '../../components/SignUp/SignUp'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import {useRouter} from 'next/router'

const Register = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(()=>{
    if(user){
      user.emailVerified && router.push("/home");
    }
  },[user,router])

  return (
    <>
      <Head>
          <title>Netflix</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/images/nficon2016.ico" />
      </Head>

      <LoginLayout>
        <SignUp/>
      </LoginLayout>
    </>
  )
}

export default Register
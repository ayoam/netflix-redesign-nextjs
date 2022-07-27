import React, { useEffect, useState } from 'react';
import Button from '../UI/Button';
import Link from 'next/link';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {motion} from 'framer-motion';
import {auth} from '../../firebase';
import { useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import {useRouter} from 'next/router'

const schema = yup.object().shape({
  email:yup.string().email().required(),
  password:yup.string().min(6).required()
})

const SignIn = () => {
  const router = useRouter();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const {register,handleSubmit,formState: { errors }} = useForm({
    resolver:yupResolver(schema),
  });

  useEffect(()=>{
    if(user){
      if(user.user.emailVerified){
        router.push("/home");
      }else{
        signOut(auth);
        router.push("/emailVerification");
      }
    }
  },[user,router])
  

  const submitForm = async ({email,password}) =>{
    signInWithEmailAndPassword(email,password)
    // console.log(user);
    // if(user.user.emailVerified===false){
    //   router.push("/emailVerification");
    // }  
    // if(user){
    //   console.log("user");
    //   if(user.user.emailVerified){
    //     console.log("ev");
    //     router.push("/home");
    //   }else{
    //     console.log("env");
    //     router.push("/emailVerification");
    //   }
    // }
  }

  return (
    <motion.div className="bg-black bg-opacity-100 sm:bg-opacity-70 py-8 px-6 sm:px-14 pb-16 sm:pb-auto text-white w-full sm:w-[400px] h-auto sm:h-[580px] rounded-sm"
      animate={{ opacity:1,x:0 }}
      transition={{ type: "spring", stiffness: 100}}
      initial={{ opacity:0,x:'-100' }}>

      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      {error &&
        <div className='text-white w-full py-3 px-4 bg-orange-500 text-xs rounded-sm mb-3'>
          Incorrect email or password.
        </div>
      }
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-3">
          <input type="text" placeholder='Email' name="email" {...register('email')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (errors.email ? "border-b-2 border-yellow-400":"")}/>
          <p className="text-sm text-red-600 mt-1">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <input type="password" placeholder='Password' name="password" {...register('password')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (errors.password ? "border-b-2 border-yellow-400":"")}/>
          <p className="text-sm text-red-600 mt-1">{errors.password?.message}</p>
        </div>
        <Button text="Sign in" styleName="w-full font-bold mt-6  bg-redBtn" large={true} loading={loading}/>
      </form>
      <div className="flex flex-row justify-between text-xs mt-3 text-neutral-400">
        <div className="flex flex-row items-center">
          <input type="checkbox" checked readOnly className="rounded mr-2 accent-neutral-500 bg-red-600 text-lg"/>
          <label>Remember me</label>
        </div>
        <a>Need help?</a>
      </div>
      <div className='mt-14 text-linksGrey'>
        <p className='text-sm'>New to Netflix? <span className='text-white hover:underline'><Link href="/register"><a>Sign up now.</a></Link></span></p>
        <p className="text-neutral-400 text-xs mt-3">{"This page is protected by Google reCAPTCHA to ensure you're not a bot."} <span className='text-blue-600 hover:underline'>Learn more</span>.</p>
      </div>
    </motion.div>
  )
}

export default SignIn
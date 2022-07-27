import React, { useEffect } from 'react'
import Button from '../UI/Button'
import Link from 'next/link'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {motion} from 'framer-motion';
import {auth} from '../../firebase';
import { useCreateUserWithEmailAndPassword,useUpdateProfile,useSendEmailVerification} from 'react-firebase-hooks/auth';
import { signInAnonymously } from "firebase/auth";
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  email:yup.string().email().required(),
  name:yup.string().required(),
  password:yup.string().min(6).required(),
  confirmPassword : yup.string().oneOf([yup.ref("password"),null]),
})

const SignUp = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    createUserError
  ] = useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const [updateProfile, updating] = useUpdateProfile(auth);

  const [sendEmailVerification, emailVerificationSending, emailVerificationError] = useSendEmailVerification(auth);

  const {register,handleSubmit,formState: { errors }} = useForm({
    resolver:yupResolver(schema),
  });

  const submitForm = async({email,password,name}) =>{
    // console.log(data);
    await createUserWithEmailAndPassword(email, password)
    .then(()=>!createUserError && updateProfile({ displayName:name}));
    await sendEmailVerification().then(()=>{
      router.push("/emailVerification");
    });
  }

  // useEffect(()=>{
  //   user && alert("user created!");
  //   user && console.log(user.user.emailVerified);
  // },[user])

  useEffect(()=>{
    createUserError && alert("Error while creating your account!");
  },[createUserError])

  return (
    <motion.div className="bg-black bg-opacity-100 sm:bg-opacity-70 py-8 px-6 sm:px-14 pb-16 sm:pb-auto text-white w-full sm:w-[400px] h-auto rounded-sm"
      animate={{ opacity:1,x:0 }}
      transition={{ type: "spring", stiffness: 100}}
      initial={{ opacity:0,x:'-100' }}>

      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="mb-3">
          <input type="text" placeholder='Email' name="email" {...register('email')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (errors.email ? "border-b-2 border-yellow-400":"")}/>
          <p className="text-sm text-red-600 mt-1">{errors.email?.message}</p>
        </div>
        <div className="mb-3">
          <input type="text" placeholder='Name' name="name" {...register('name')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (errors.name ? "border-b-2 border-yellow-400":"")}/>
          <p className="text-sm text-red-600 mt-1">{errors.name?.message}</p>
        </div>
        <div className="mb-3">
          <input type="password" placeholder='Password' name="password" {...register('password')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (errors.password ? "border-b-2 border-yellow-400":"")}/>
          <p className="text-sm text-red-600 mt-1">{errors.password?.message}</p>
        </div>
        <div className="mb-3">
          <input type="password" placeholder='Confirm Password' name="confirmPassword" {...register('confirmPassword')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (errors.confirmPassword ? "border-b-2 border-yellow-400":"")}/>
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword && "passwords doesn't match"}</p>
        </div>
        <Button text="Sign Up" styleName="w-full font-bold mt-6  bg-redBtn" large={true} loading={loading || emailVerificationSending}/>
      </form>

      {/* <Button text="Continue as Guest" styleName="w-full font-bold mt-2  bg-redBtn" large={true} onClick={()=>signInAnonymously(auth)}/> */}

      <div className="flex flex-row justify-between text-xs mt-3 text-neutral-400">
        <div className="flex flex-row items-center">
          <input type="checkbox" checked readOnly className="rounded mr-2 accent-neutral-500 bg-red-600 text-lg"/>
          <label>Remember me</label>
        </div>
        <a>Need help?</a>
      </div>
      <div className='mt-14 text-linksGrey'>
        <p className='text-sm'>Already have an account? <span className='text-white hover:underline'><Link href="/login"><a>Log in.</a></Link></span></p>
        <p className="text-neutral-400 text-xs mt-3">{"This page is protected by Google reCAPTCHA to ensure you're not a bot."} <span className='text-blue-600 hover:underline'>Learn more</span>.</p>
      </div>
    </motion.div>
  )
}

export default SignUp
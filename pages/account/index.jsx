import React,{useEffect,useState} from 'react'
import Header from '../../components/Header/Header'
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../../components/UI/Button';
import toast, { Toaster } from 'react-hot-toast'
import { useAuthState, useUpdateProfile, useUpdatePassword} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import {EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth';
import {useRouter} from 'next/router'

const ProfileSchema = yup.object().shape({
  name:yup.string().min(3).required(),
})

const PasswordSchema = yup.object().shape({
  currentPassword:yup.string().min(6).required(),
  newPassword:yup.string().min(6).required(),
  confirmNewPassword : yup.string().oneOf([yup.ref("newPassword"),null]),
})

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '8px',
  borderRadius: '9999px',
  maxWidth: '1000px',
}

//test

const Account = () => {

  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push("/login");
    }
  },[user,router])

  const [updateProfile, ProfileUpdating] = useUpdateProfile(auth);

  const [currentPasswordValid,setCurrentPasswordValid] = useState(null);

  const [isLoading,setIsLoading] = useState(false);

  const [updatePassword, PasswordUpdating, PassswordError] = useUpdatePassword(auth);

  const {register:ProfileRegister,handleSubmit:ProfileHandleSubmit,formState: { errors:ProfileErrors },reset:resetProfileForm} = useForm({
    resolver:yupResolver(ProfileSchema),
  });

  const {register:PasswordRegister,handleSubmit:PasswordHandleSubmit,formState: { errors:PasswordErrors },reset:resetPasswordForm} = useForm({
    resolver:yupResolver(PasswordSchema),
  });

  const submitProfileForm = async({name}) =>{

    await updateProfile({ displayName:name});
    resetProfileForm();
    toast(`Profile updated successfully`,
    {
      style: toastStyle,
    })
  }

  const checkCurrentPassword =async(currentPassword)=>{
    var credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    setIsLoading(true);
    try{
      const authResult = await reauthenticateWithCredential(auth.currentUser,credential);
      setIsLoading(false);
      return true;
    }
    catch(err){
      setIsLoading(false);
      return false;
    }
  }

  const submitPasswordForm = async({currentPassword,newPassword}) =>{
      const currentPasswordIsValid = await checkCurrentPassword(currentPassword);
      setCurrentPasswordValid(currentPasswordIsValid);
      if(!currentPasswordIsValid){
        return;
      }

      await updatePassword(newPassword);
      await resetPasswordForm();
      toast(`Password updated successfully`,
      {
        style: toastStyle,
      })
  }

  if(!user){
    return null;
  }

  return (
    <>
    <Toaster position="bottom-center" containerStyle={{
        bottom: '20px',
      }} />
      <Header/>
      <div className='pt-6 sm:pt-16'></div>
      <div className=' w-[90%] sm:w-2/3 mx-auto max-w-screen-sm text-white bg-transparent sm:bg-neutral-800 sm:px-14 my-12 py-8 sm:py-12'>
        <h1 className='text-4xl font-bold text-white mb-3'>Account</h1>
        <hr className='h-[2px] border-none bg-neutral-400 mb-12'></hr>
        <div className='my-6'>
          <h1 className='text-2xl mb-6'>Update Profile</h1>
          <form onSubmit={ProfileHandleSubmit(submitProfileForm)}>
            <div className="mb-3">
              <input type="text" placeholder='Email' name="email" defaultValue={user?.email} disabled className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "}/>
            </div>
            <div className="mb-3">
              <input type="text" placeholder='Name' name="name" {...ProfileRegister('name')} defaultValue={user?.displayName} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (ProfileErrors.name ? "border-b-2 border-yellow-400":"")}/>
              <p className="text-sm text-red-600 mt-1">{ProfileErrors.name?.message}</p>
            </div>
            <Button text="Update" styleName="font-bold mt-6 bg-redBtn" loading={ProfileUpdating} disabled={isLoading}/>
          </form>
        </div>
        <div className='mt-12'>
          <h1 className='text-2xl mb-6'>Update Password</h1>
          <form onSubmit={PasswordHandleSubmit(submitPasswordForm)}>
            <div className="mb-3">
              <input type="password" placeholder='Current Password' onFocus={()=>setCurrentPasswordValid(null)} name="currentPassword" {...PasswordRegister('currentPassword')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (PasswordErrors.currentPassword ? "border-b-2 border-yellow-400":"")}/>
              <p className="text-sm text-red-600 mt-1">{PasswordErrors.currentPassword?.message}</p>
              {currentPasswordValid===false && <p className="text-sm text-red-600 mt-1">Invalid Current Password</p>}
            </div>
            <div className="mb-3">
              <input type="password" placeholder='New Password' name="newPassword" {...PasswordRegister('newPassword')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (PasswordErrors.newPassword ? "border-b-2 border-yellow-400":"")}/>
              <p className="text-sm text-red-600 mt-1">{PasswordErrors.newPassword?.message}</p>
            </div>
            <div className="mb-3">
              <input type="password" placeholder='Confirm New Password' name="confirmNewPassword" {...PasswordRegister('confirmNewPassword')} className={"w-full rounded-sm p-3 px-4 outline-none bg-netGray placeholder:text-sm focus:bg-neutral-700 "+ (PasswordErrors.confirmNewPassword ? "border-b-2 border-yellow-400":"")}/>
              <p className="text-sm text-red-600 mt-1">{PasswordErrors.confirmNewPassword && "passwords doesn't match"}</p>
            </div>
            <Button text="Update Password" styleName="font-bold mt-6 bg-redBtn" loading={PasswordUpdating || isLoading} disabled={isLoading}/>
          </form>
        </div>
    </div>


    </>
  )
}

export default Account
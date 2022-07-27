import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineChevronRight } from "react-icons/hi";

const GetStartedEmail = ({onGetStartedClick}) => {
  const [emailInput,setEmailInput] = useState('');
  const [emailTextVisible,setEmailTextVisible] = useState(false);
  const [isTouched,setIsTouched] = useState(false);
  const [hasError,setHasError] = useState(false);

  const emailInputChangeHandler= (e)=>{
    setEmailInput(e.target.value);
    
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
      setHasError(true);
    }else{
      setHasError(false);
    }
  }


  const getStartedClickHandler = (e)=>{
    e.preventDefault();
    if(!hasError){
      onGetStartedClick(emailInput);
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row w-full mt-3 h-auto md:h-16">
        <div className="bg-white w-full sm:w-[90%] md:w-[70%] mx-auto h-14 md:h-full px-2 py-2 flex flex-col justify-center relative rounded-sm md:rounded-none md:rounded-l-sm">
          {emailTextVisible && <p className="text-gray-400 text-xs font-semibold transition-all pt-0 md:pt-1">Email address</p>}
          <input value={emailInput} onChange={emailInputChangeHandler} onBlur={()=>{setIsTouched(true);setEmailTextVisible(false);}} onFocus={()=>setEmailTextVisible(true)} type="text" placeholder={!emailTextVisible ?'Email address':''} className="outline-none text-black w-full py-0 md:py-2 placeholder:text-sm md:placeholder:text-base"/>
          {(isTouched && hasError) && <p className="text-red-600 text-xs mt-2 absolute -bottom-6 left-0">Please enter a valid email address!</p>}
        </div>
        <button className="bg-red-600 w-auto md:w-[30%] flex justify-center items-center text-md md:text-2xl hover:bg-red-500 mt-10 md:mt-0 rounded-sm md:rounded-none md:rounded-r-sm mx-auto py-2 px-3 md:py-0 md:px-0" onClick={getStartedClickHandler}>Get Started <HiOutlineChevronRight/></button>
      </div>
    </>

  )
}

export default GetStartedEmail
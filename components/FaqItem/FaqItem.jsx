import React, { useEffect, useState } from 'react'
import { VscChromeClose } from "react-icons/vsc";

const FaqItem = ({title,content}) => {

  let text= content.replace(/\\n/g,'%SEPARATOR%\\n%SEPARATOR%').replace(/%SEPARATOR%%SEPARATOR%/g,'%SEPARATOR%');
  text = text.split('%SEPARATOR%').map((elt,pos)=>{
    if(elt=='\\n'){
      return <br key={pos}/>
    }else{
      return <p key={pos}>{elt}</p>
    }
  })

  const [resIsOpen,setResIsOpen] = useState(false);
  const btnClickHandler = ()=>{
    if(resIsOpen){
      setResIsOpen(false);
    }else{
      setResIsOpen(true);
    }
  }

  const ResStyle = resIsOpen?"rotate-0":"rotate-45";
  
  return (
    <div className="text-white mb-2 w-full max-w-4xl mx-auto">
      <button className="bg-netGray flex flex-row items-center w-full mx-auto text-md md:text-xl lg:text-2xl p-4 md:p-5 lg:p-6 justify-between" onClick={btnClickHandler}>
        {title}
        <VscChromeClose className={"text-white transition-all ease-in-out delay-100 text-lg md:text-xl lg:text-2xl"+" "+ResStyle}/>
      </button>
      {resIsOpen && 
        <div className="bg-netGray w-full mx-auto text-md md:text-xl lg:text-2xl p-4 md:p-5 lg:p-6 mt-[2px]">
          {text}
        </div>
      }
    </div>
  )
}

export default FaqItem
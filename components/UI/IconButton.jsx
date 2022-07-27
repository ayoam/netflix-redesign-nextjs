import React from 'react'
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";


const IconButton = ({type,styleName,onClick}) => {
  return (
    <>
      {type==="play" 
      &&
      <button className="bg-white text-black font-bold flex flex-row items-center gap-2 px-5 py-2 rounded shadow-md"><FaPlay className="text-xl"/>Play</button>
      }
      {type==="info" 
      &&
      <button className='bg-neutral-600 text-white font-bold flex flex-row items-center gap-2 px-5 py-2 rounded shadow-md hover:bg-opacity-70 transition-all'  onClick={onClick ? onClick : null}><AiOutlineInfoCircle className="text-xl"/>More info</button>
      }
    </>
  )
}

export default IconButton
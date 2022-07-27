import React,{useState} from 'react'
import Image from 'next/image'
import {BASE_IMG_URL,BASE_IMG_URL_500w} from '../../utils/requests';
import { useSetRecoilState } from 'recoil';
import {modalState,currentMovieState} from '../../recoil/atoms/modalAtoms'

const Card = ({movie}) => {
  const setShowModal = useSetRecoilState(modalState);
  const setCurrentMovie = useSetRecoilState(currentMovieState);
  const [imageError,setImageError] = useState(false);
  const [imageHover,setImageHover] = useState(false);
  const fallBackSrc =
    "https://res.cloudinary.com/dewctbby3/image/upload/v1647663227/7dc497e2-4975-11ec-a9ce-066b49664af6_cm_1440w_dugogx.jpg";

  const handleMovieClick = () =>{
    setShowModal(true);
    setCurrentMovie(movie);
  }

  return (
    <div className="mx-1 cursor-pointer relative flex justify-center" onClick={handleMovieClick}>
      {imageError && <div className="bg-white bg-opacity-10 absolute top-0 right-0 z-50 w-full h-full"></div>}
      <Image src={!imageError?`${BASE_IMG_URL_500w}${movie.backdrop_path}`:fallBackSrc}
      alt="backdrop" 
      className=" rounded hover:scale-105 transition-all"
      width={350}
      height={200}
      onError={() => setImageError(true)}/>
    </div>
  )
}

export default Card
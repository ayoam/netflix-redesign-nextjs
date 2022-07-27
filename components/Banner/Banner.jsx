import React, { useEffect,useState } from 'react';
import {BASE_IMG_URL,BASE_IMG_URL_500w} from '../../utils/requests';
import IconButton from '../UI/IconButton'
import { useSetRecoilState } from 'recoil';
import {modalState,currentMovieState} from '../../recoil/atoms/modalAtoms'

const Banner = ({data}) => {
  const setShowModal = useSetRecoilState(modalState);
  const setCurrentMovie = useSetRecoilState(currentMovieState);

  const [movie,setMovie] = useState(null);
  useEffect(()=>{
    setMovie(data[Math.floor(Math.random()*data.length)]);
    // setMovie(data[0]);
  },[data])

  const imageUrl = movie?`url(${BASE_IMG_URL}/${movie.backdrop_path})` :"";

  const infoBtnClickHandler = () => {
    setShowModal(true);
    setCurrentMovie(movie);
  };

  if(!movie){
    return (
      <div className=" bg-black w-full h-[90vh] bg-cover bg-center text-white relative">
        <div className=" absolute z-10 right-0 top-1/2 transform -translate-y-1/2 w-[40%] left-[8%]">
          <div className="rounded-md mx-auto">
            <div className="flex animate-pulse flex-col space-y-4  h-full justify-center ">
              <div className="  w-[210px] h-10 sm:h-14 rounded-lg bg-slate-300"></div>
              <div className=" flex space-x-4">
                <div className=" rounded-md sm:rounded-lg w-24 h-5 sm:h-8 bg-slate-300"></div>
                <div className=" rounded-md sm:rounded-lg w-24 h-5 sm:h-8 bg-slate-300"></div>
              </div>
              <div className="w-[300px] sm:w-[320px] p-2 rounded-lg h-14 bg-slate-200">
                <div className=" bg-slate-300 w-full rounded-sm h-4"></div>
                <div className=" mt-2 bg-slate-300 w-full rounded-sm h-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
      style={{backgroundImage: imageUrl}} className={"w-full h-[90vh] bg-cover bg-center text-white relative"}>
        <div className="absoulte w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className='absolute z-10 right-0 top-1/2 transform -translate-y-1/2 w-[70%] md:w-[40%] left-[8%]'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-8 drop-shadow-lg'>{movie?.original_title}</h1>
          <div className='flex flex-row gap-2 mb-8'>
            <IconButton type={"play"}/>
            <IconButton type={"info"} onClick={infoBtnClickHandler}/>
          </div>
          <p className="text-lg sm:text-2xl line-clamp-5 sm:line-clamp-3">{movie?.overview}</p>
        </div>
      </div>
    </>
  )
}

export default Banner
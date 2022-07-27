import React,{ useState,useEffect } from 'react'
import dynamic from 'next/dynamic'
import { RiCloseCircleLine } from "react-icons/ri";
import axios from '../../axios';
import {AnimatePresence,motion} from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast'

import {
  HiCheck,
  HiPlus,
  HiVolumeOff,
  HiVolumeUp,
} from "react-icons/hi";

import IconButton from '../UI/IconButton'
import {modalState,currentMovieState} from '../../recoil/atoms/modalAtoms'
import {myListState} from '../../recoil/atoms/myListAtoms'

import { useRecoilState } from 'recoil';

import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth,db} from '../../firebase';

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const toastStyle = {
  background: 'white',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '8px',
  borderRadius: '9999px',
  maxWidth: '1000px',
}

const InfoModal = ()=>{

  const [user, loading, error] = useAuthState(auth);
  const [showModal,setShowModal] = useRecoilState(modalState);
  const [currentMovie,setCurrentMovie] = useRecoilState(currentMovieState);
  const [myList,setMyList] = useRecoilState(myListState);
  const [movieDetails,setMovieDetails] = useState(null);
  const [addedToList,setAddedToList] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if(myList && currentMovie){
      myList.forEach((item)=>{
        if(item.id===currentMovie.id){
          setAddedToList(true);
        }
      })
    }
  }, [myList,currentMovie])


  const handleAddToList = async() =>{
    if(addedToList){
      await deleteDoc(
        doc(db, 'users', user.uid, 'myList', currentMovie?.id.toString())
      ).then(()=>{
        setAddedToList(false);
        toast(`${currentMovie?.title || currentMovie?.original_name} has been removed from My List.`,
        {
          style: toastStyle,
        })
      })
      .catch(()=>{
        console.log("error");
      })
    }
    else{
      await setDoc(
        doc(db, 'users', user.uid, 'myList', currentMovie?.id.toString()),
        {
          ...currentMovie,
        }
      ).then(()=>{
        setAddedToList(true);
        toast(`${currentMovie?.title || currentMovie?.original_name} has been added to My List.`,
        {
          style: toastStyle,
        })
      })
      .catch(()=>{
        console.log("error");
      })
    }
  }

  const modalCloseHandler = () =>{
    setShowModal(false);
    setCurrentMovie(null);
    setAddedToList(false);
    setMuted(true);
  } 

  useEffect(()=>{
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const getMovieDetails = async ()=>{
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${currentMovie?.id}?api_key=${API_KEY}&append_to_response=videos`);
      const data  = await response.data;
      setMovieDetails(data);
    }
    currentMovie && getMovieDetails();
  },[currentMovie])

  if(!currentMovie ){
    return null;
  }


  return (
    <>
      <Toaster position="bottom-center" containerStyle={{
        bottom: '20px',
      }} />
      {showModal 
      &&
      <div>
        <div className='bg-opacity-40 backdrop-brightness-50 backdrop-blur-sm	 w-screen h-full fixed top-0 left-0 z-50'></div>
        <motion.div className="bg-neutral-800 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] md:w-[720px] rounded-md overflow-hidden"
        animate={{ opacity:1}}
        transition={{ type: "spring", stiffness: 100}}
        initial={{ opacity:0}}>

          <div className=' relative pt-[56.25%]'>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${movieDetails?.videos.results[0]?.key}`}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                playing={true}
                loop
                muted={muted}
            />
            <button className="absolute top-2 right-2 text-white text-3xl cursor-pointer" onClick={modalCloseHandler}><RiCloseCircleLine/></button>
            <div className='absolute bottom-2 left-3'>
              <div className='flex flex-row gap-2 items-center'>
                <IconButton type={"play"}/>
                <button className='cursor-pointer text-white text-2xl rounded-full p-1 border-[1px] bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 flex flex-col items-center justify-center' onClick={handleAddToList}>{addedToList?<HiCheck/>:<HiPlus/>}</button>
                <button className='cursor-pointer text-white text-lg rounded-full p-[7px]  border-[1px] bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 flex flex-col items-center justify-center' onClick={()=>muted?setMuted(false):setMuted(true)}>{muted?<HiVolumeOff/>:<HiVolumeUp/>}</button>
              </div>
            </div>
          </div>
          <div className='p-5 pb-8 text-white'>
            <p className='pb-4 flex gap-2 items-center font-light text-sm'>
              <span className="text-green-400 font-medium">{currentMovie?.vote_average * 10}% Match</span>
              <span>{currentMovie.release_date}</span>
              <span className="border-[1px] rounded-sm text-xs px-2 inline-block">HD</span>
            </p>
            <h1 className='text-2xl sm:text-3xl mb-4 font-bold'>{currentMovie?.title}</h1>
            <div className='flex gap-4 flex-col sm:flex-row'>
              <div className='w-full sm:w-2/3 line-clamp-6 text-md'>{currentMovie?.overview}</div>
              <div className='w-full sm:w-1/3 flex flex-col gap-3'>
                  <p><span className="text-neutral-400">Genres : </span>{movieDetails?.genres.map((elt)=>elt.name).join(", ")}</p>
                  <p><span className="text-neutral-400">Original language : </span>{currentMovie?.original_language}</p>
                  <p><span className="text-neutral-400">Total votes : </span>{currentMovie?.vote_count}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      }
    </>
  )
}

export default InfoModal
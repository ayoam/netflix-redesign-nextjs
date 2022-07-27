import React,{useEffect} from 'react'
import Header from '../../components/Header/Header'
import axios from '../../axios';
import requests from '../../utils/requests'
import Banner from '../../components/Banner/Banner'
import RowSlider from '../../components/Row/RowSlider'
import HomeFooter from '../../components/HomeFooter/HomeFooter'
import InfoModal from '../../components/InfoModal/InfoModal';
import {modalState} from '../../recoil/atoms/modalAtoms'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import {useRouter} from 'next/router'
import { useRecoilState } from 'recoil';
import {myListState} from '../../recoil/atoms/myListAtoms'
import {
  collection,
  onSnapshot,
} from 'firebase/firestore'

import {db} from '../../firebase';

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow
}) => {
  const [myList,setMyList] = useRecoilState(myListState);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push("/login");
    }
  },[user,router])

  useEffect(() => {
    console.log("db");
    if (user) {
      onSnapshot(
        collection(db, 'users', user.uid, 'myList'),
        (snapshot) => {
          setMyList(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        }
      )
    }
  }, [db])

  if(!user){
    return null;
  }

  return (
    <div className="bg-black">
      <Header transparent={true}/>
      <Banner data={netflixOriginals}/>
      <div className='px-4'>
        <RowSlider data={trendingNow} title="Trending Now"/>
        <RowSlider data={topRated} title="Top Rated"/>
        {myList?.length>0 && <RowSlider data={myList} title="My List"/>}
        <RowSlider data={actionMovies} title="Action Thrillers"/>
        <RowSlider data={comedyMovies} title="Comedies"/>
        <RowSlider data={horrorMovies} title="Scary movies"/>
        <RowSlider data={romanceMovies} title="Romance movies"/>
        <RowSlider data={documentaries} title="Documentaries"/>
      </div>
      <InfoModal/>
      <HomeFooter/>
    </div>
  )
}

export async function getStaticProps(context) {
  const [
    netflixOriginals,
    actionMovies,
    comedyMovies,
    documentaries,
    horrorMovies,
    romanceMovies,
    topRated,
    trendingNow
  ] = await Promise.all([
    axios.get(requests.fetchNetflixOriginals).then((response) => response.data.results),
    axios.get(requests.fetchActionMovies).then((response) => response.data.results),
    axios.get(requests.fetchComedyMovies).then((response) => response.data.results),
    axios.get(requests.fetchDocumentaries).then((response) => response.data.results),
    axios.get(requests.fetchHorrorMovies).then((response) => response.data.results),
    axios.get(requests.fetchRomanceMovies).then((response) => response.data.results),
    axios.get(requests.fetchTopRated).then((response) => response.data.results),
    axios.get(requests.fetchTrending).then((response) => response.data.results),
    ]);
  // console.log(process.env.NEXT_PUBLIC_API_KEY);
  return {
    props: {
      netflixOriginals,
      actionMovies,
      comedyMovies,
      documentaries,
      horrorMovies,
      romanceMovies,
      topRated,
      trendingNow
    },
  }
}

export default Home
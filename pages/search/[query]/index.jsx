import React,{useEffect} from 'react'
import Header from '../../../components/Header/Header'
import SearchResult from '../../../components/SearchResult/SearchResult'
import axios from '../../../axios'
import InfoModal from '../../../components/InfoModal/InfoModal'
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from '../../../firebase'
import {useRouter} from 'next/router'

const Search = ({data}) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push("/login");
    }
  },[user,router])

  if(!user){
    return null;
  }

  return (
    <>
      <Header/>
      <SearchResult data={data}/>
      <InfoModal/>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const searchTerm = context.params.query;
  const data = await axios.get(`search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`).then((response)=>response.data);
  return {
    props: {
      data
    },
  }
}
export default Search
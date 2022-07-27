import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Card from '../Row/Card'
import axios from '../../axios'

const SearchResult = ({data}) => {
  console.log(data);
  const router = useRouter();
  const { query } = router.query;
  const totalPage = data.total_pages;
  const [currentPage,setCurrentPage] = useState(1);
  const [AllResults,setAllResults] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    setAllResults(data.results);
  },[data])

  const loadMoreHandler = () =>{
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const loadMore = async()=>{
      try{
        setIsLoading(true);
        const response = await axios.get(`search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${currentPage+1}`)
        const data = await response.data.results;
        setAllResults(prev=>[...prev,...data]);
        setCurrentPage(prev=>prev+1);
        setIsLoading(false);
      }
      catch(err){
        alert(err.message);
      }
    }
    loadMore();
  }
  
  return (
    <>
      <div className="pt-24 px-6 bg-black text-white">
        {AllResults.length===0 &&
        <div className='h-screen mt-28 text-center text-xl'>
          <p>No results found for <span className="underline font-medium">{query}</span> are you sure you typed it correctly?</p>
        </div> 
        }
        {AllResults.length>0 &&
          <div>
            <h1 className="text-2xl ml-2 sm:ml-12">Search results for <span className="underline font-medium">{query}</span> :</h1>
            <div className=" justify-center gap-5 flex flex-wrap py-8">
              {AllResults.map((elt)=><Card key={elt.id} movie={elt}/>)}
            </div>
            {currentPage<totalPage 
            && 
            <center>
              <button className='bg-red-700 my-6 py-3 px-4 hover:bg-red-600 rounded flex gap-3' onClick={loadMoreHandler}>Load more
              { isLoading &&
                <svg aria-hidden="true" className="mr-2 w-6 h-6 text-gray-400 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>   
              }
              </button>
            </center>}       
          </div>
        } 
      </div>
    </>

  )
}



export default SearchResult
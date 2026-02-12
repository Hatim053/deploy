import { useMemo, useRef, useState } from 'react'
import './App.css'
import socket from './socket.js'
import { useEffect } from 'react'
import Header from './components/Header/Header.jsx'
import SearchSuggestions from '../src/components/Header/SearchSuggestions.jsx'
import Nav from './components/Nav/Nav.jsx'
import Banner from './components/Banner/Banner.jsx'
import Feed from './components/Feed/Feed.jsx'
import Footer from './components/Footer/Footer.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FeedSkeleton from './SkeletonUi/FeedSkeleton.jsx'
import Pagination from './components/Pagination/Pagination.jsx'

function App() {

  const user = useSelector(state => state?.loggedInUser)
  const navigate = useNavigate()
  const [searchedQuery, setSearchedQuery] = useState(null)
  const [location, setLocation] = useState('Bhopal')
  const [suggestionList, setSuggestionList] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [recentAds , setRecentsAds] = useState(null)
  const [page , setPage] = useState(1)
  const [nextPage , setNextPage] = useState(false)
  const timerRef = useRef(null)
  const limit = 12

  useEffect(() => {
    if (!user) navigate('/user-login')
    if (user?._id) socket.emit('registerUser', user._id) // emmiting event to backend after user/seller login so that we can store their socketId's
  }, [user])

  useEffect(() => {
    if (!searchedQuery) return // to prevent it from fetching on initial render when search query is ""
    if(timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(getSuggestions,400)
  }, [searchedQuery, location])

  useEffect(() => {
  if(searchResult) {
  getSearchedAdvertisements(searchResult[0].serviceType , page)
  return // means page change is triggered on feed not on home page
  }
  getRecentAdvertisements()
  } , [page])
  
   async function fetchData(url) {
    let response = await fetch(url)
    let jsonData = await response.json()
    return jsonData.ads
  }
  async function getSuggestions() {
      try {
        const response = await fetchData(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/query/${searchedQuery}/${location}`)
        console.log(response)
        setSuggestionList(response)

      } catch (error) {
        console.log('could not fetch advertisements', error)
      }
    }
  async function getSearchedAdvertisements(serviceType , currPage) {
    console.log('getAdvertisement')
    try {
      const response = await fetchData(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/${serviceType || 'furniture'}/${location || 'bhopal'}/${(currPage-1)*limit}/${limit+1}`)
      console.log('searched ',response)
      searchResult ? setSearchResult([...searchResult , ...response]) : setSearchResult(response)
      if(response.length > limit) setNextPage(true)
      else setNextPage(false)
    } catch (error) {
      console.log('could not fetch advertisements', error)
    }
  }
  async function getRecentAdvertisements() {
    // console.log('getRecent')
    const response = await fetchData(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/recentAds/${(page-1)*limit}/${limit+1}`)
    recentAds ? setRecentsAds([...recentAds , ...response]) : setRecentsAds(response)
    if(response.length > limit) setNextPage(true)
    else setNextPage(false)

  }
  return (
    <>
      <Header setSearchedQuery={setSearchedQuery} setLocation={setLocation} setPage={setPage} />
      {suggestionList && <SearchSuggestions suggestionList={suggestionList} setSuggestionList={setSuggestionList} getSearchedAdvertisements={getSearchedAdvertisements} setPage={setPage} />}
      {/* <Nav getSearchedAdvertisements={getSearchedAdvertisements} /> */}

      {searchedQuery == null && <Banner />}
      {(!searchResult && !recentAds) && <FeedSkeleton/>}
      {searchResult && <Feed searchResult={searchResult} page={page} limit = {limit}/>}
      {(recentAds && !searchResult) && <Feed searchResult={recentAds} page={page} limit={limit} />}
      {(searchResult || recentAds) && <Pagination setPage = {setPage} page = {page} stop = { nextPage}/>} 
      <Footer />
    </>
  )

}

export default App

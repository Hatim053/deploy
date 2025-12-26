import React, { useRef, useState } from "react"
import styles from './header.module.css'
import logo from './images/ChatGPT Image Nov 11, 2025, 07_40_12 AM.png'
import chatIcon from './images/messenger.png'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header({ setSearchedQuery , setLocation }) {

    const searchRef = useRef(null)
    const locationRef = useRef(null)

  function searchAdvertisements() {

    setLocation(locationRef.current.value)
    setSearchedQuery(searchRef.current.value)
 
  }

    const navigate = useNavigate()
    const loggedInUser = useSelector(state => state.loggedInUser)
    
  function redirectProfile() {
    navigate('/profile-feed')
  }

  function redirectPostAd() {
    if(loggedInUser.accountType == 'user') navigate('/seller-signup')
    else navigate('/postAdvertisement')
  }
  function redirectchat() {
    navigate('/chat')
  }
  function redirectHome() {
    console.log('clicked')
    navigate('/')
  }
  function redirectLogout() {
  fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/${loggedInUser.accountType}/logout` , {
    method : 'GET',
    credentials : 'include',
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.status == 200) navigate(`/${loggedInUser.accountType}-login`)
      else navigate(`/${loggedInUser.accountType}-login`)
  })
  }
    return (
        <>
                <header className = {styles.header}>
                    
            <img src={logo} alt="" className = {styles.logo} onClick = {redirectHome}/>
            <div className = {styles.location}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"
                    role="img">
                    <title>Search</title>
                    <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="22" y2="22" />
                    </g>
                </svg>
                <input ref = {locationRef} type="text" placeholder = {`ex : "Bhopal"`}/>

            </div>
            <div className = {styles.searchBar}>
                <input ref = {searchRef} type="text" placeholder={`search for "furniture"`}/>
                <button className ={styles.svg} onClick = {searchAdvertisements}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                        aria-hidden="true" role="img">
                        <title>Search</title>
                        <g fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="7" />
                            <line x1="16.5" y1="16.5" x2="22" y2="22" />
                        </g>
                    </svg>

                </button>
            </div>
            <div className = {styles.controlls}>


                <button className = {styles.profileBtn} onClick = {redirectProfile} title="Profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                </button>
                <button className = {styles.chatBtn} title="Chat" onClick= {redirectchat}>
                    <img src={chatIcon} alt=""/>
                </button>
                <button className = {styles.logoutBtn} onClick = {redirectLogout}>Logout
                </button>
                <button className = {styles.sellBtn} onClick = {redirectPostAd}>
                    Rent Out Now
                </button>
            </div>
        </header>
        </>
    )
}

export default Header
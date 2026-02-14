import React, { useRef, useState } from "react"
import styles from './header.module.css'
import logo from './images/ChatGPT Image Nov 11, 2025, 07_40_12 AM.png'
import chatIcon from './images/messenger.png'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header({ setSearchedQuery , setLocation , setPage}) {

    const navigate = useNavigate()
    const loggedInUser = useSelector(state => state.loggedInUser)
    console.log(loggedInUser)
  function redirectProfile() {
    if(!loggedInUser) {
    navigate('/user-login');
    return;
    }
    navigate('/profile-feed')
  }

  function redirectPostAd() {
     if(!loggedInUser) navigate('/user-login');
    if(loggedInUser.accountType == 'user') navigate('/seller-signup')
    else navigate('/postAdvertisement')
  }
  function redirectchat() {
   if(!loggedInUser) {
    navigate('/user-login');
    return;
    }
    navigate('/chat')

  }
  function redirectHome() {
    console.log('clicked')
    navigate('/')
  }
  function redirectLogout() {
     if(!loggedInUser) navigate('user-login');
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
                <input onChange = {(e) => setLocation(e.target.value)}  type="text" placeholder = {`"your location"`}/>

            </div>
            <div className = {styles.searchBar}>
                <input onChange = {(e) => {setSearchedQuery(e.target.value) , setPage(1)}} type="text" placeholder={`search for "furniture"`}/>
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
               {loggedInUser &&  <button className = {styles.logoutBtn} onClick = {redirectLogout}>Logout
                </button>}
                {!loggedInUser && <button className={styles.loginBtn} onClick = {() => navigate('/user-login')}>Login</button>}
                <button className = {styles.sellBtn} onClick = {redirectPostAd}>
                    Rent Out Now
                </button>
            </div>
        </header>
        </>
    )
}

export default Header
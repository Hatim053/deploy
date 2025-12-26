import React from "react"
import styles from './chatFeed.module.css'
import ChatBox from '../ChatBox/ChatBox.jsx'
import ChatList from '../ChatList/ChatList.jsx'
import { addChatId } from "../../../user/chatSlice.js"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom' 

function ChatFeed() {
const[update , setUpdate] = useState(false)
const navigate = useNavigate()

return (
    <>
    <button className = {styles['back-btn']} onClick = {() => navigate(-1)}>← Back</button>
       <div  className = {styles['chat-container']}>
      <ChatList setUpdate = {setUpdate} update = {update} />
      <ChatBox setUpdate = {setUpdate} update = {update}/>
    </div>
    </>
)
}


export default ChatFeed
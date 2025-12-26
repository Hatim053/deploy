import React, { useEffect, useState } from "react"
import styles from './chatList.module.css'
import { useSelector  } from "react-redux"
import ChatListItem from "../ChatListItem/ChatListItem.jsx"


function ChatList({ setUpdate , update }) {
// fetching for the previous chats of the loggedIn person
const [chatList , setChatList] = useState([])
const loggedInUser = useSelector(state => state.loggedInUser)
const loggedInUserType = loggedInUser?.accountType
const loggedInUserId = loggedInUser._id
// console.log(loggedInUserId)
// console.log(loggedInUserType)

useEffect(() => {
fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/api/chats/${loggedInUserType}/${loggedInUserId}` , {
    method : 'GET',
    credentials : 'include',
    headers: {
    "Content-Type": "application/json",
  },
})
.then((res) => res.json())
.then((data) => {
    console.log(data.chatList)
    setChatList(data.chatList)
})
} , [])


    return (
        <>
          <div  className = {styles['chat-sidebar']}>
        <div className = {styles['sidebar-header']}>
            <h3>Chats</h3>
        </div>
        <ul  className = {styles['contact-list']}>


           { !chatList || chatList.length == 0 ? <span className = {styles['no-chats']}>no chats yet</span> :
            chatList.map((chat) => (
                 <ChatListItem receiverName = {chat.person1==loggedInUser.username ? chat.person2:chat.person1} id = {chat._id} receiverId = {chat.participants[0] == loggedInUserId ? chat.participants[1]:chat.participants[0]} setUpdate = {setUpdate} update = {update} />
            )) 
           }
            </ul>
    </div>
        </>
    )
}


export default ChatList
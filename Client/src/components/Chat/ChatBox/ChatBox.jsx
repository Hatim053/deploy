import React, { useEffect, useRef, useState } from "react"
import   socket  from "../../../socket.js"
import styles from './chatBox.module.css'
import { useSelector } from 'react-redux'


// reference for frontend ui 
function ChatBox ({ setUpdate , update })  {
  const [chat, setChat] = useState([])
  const messageRef = useRef(null)
  const chatId = useSelector(state => state.chatId)
  const currentUser = useSelector(state => state.loggedInUser)
  const currentUserId = currentUser._id
  const currentUserType = currentUser.accountType
  const receiver = useSelector(state => state.receiver)
  const receiverId = receiver?.receiverId
  const receiverName = receiver?.receiverName

  //  console.log(receiverId)

   // prevoius chat load kari he idhar agar exist karti he to
  useEffect(() => {
   console.log(chatId)
   if(chatId) {
    
     fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/api/messages/${chatId}` , {
      method : 'GET', 
      credentials: "include",
      headers: {
    "Content-Type": "application/json",
  },
      
     })
       .then((data) => data.json())
      .then((res) => {
        if(res.status == 200) {
          console.log(res.messages)
          setChat(res.messages)
        }
      })
   }
  }, [chatId]);

  // Listen for live messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      if (data.senderId === receiverId) setChat((prev) => [...prev, data])
    });
    return () => socket.off("receiveMessage")
  }, [receiverId])

  const sendMessage = () => {
    const message = messageRef.current.value
    if (!message.trim()) return
    socket.emit("sendMessage", { senderId: currentUserId, receiverId, currentUserType , message })
    
    setChat((prev) => [...prev, { senderId: currentUserId, message }])
    const not = !update
    document.getElementById('chat-input').value = '' 
    setUpdate(not)
    
  };

  return (
    <>
 <div  className = {styles['chat-main']}>
        <div  className = {styles['chat-header']}>
            <h4>{receiverName || '---'} {receiver?.accountType && (receiver.accountType)}</h4>
            <div className = {`${styles['status']} ${styles['online']}`}>{receiver && 'Online'}</div>
        </div>

        <div  className = {styles['chat-messages']}>
          {chat.map((message) => (
             <div  className = {`${styles['message']} ${message.senderId == currentUserId ? styles['outgoing']:styles['incoming']}`}>
                <p>{message.message}</p>
                <span className = {styles['message-time']}> {new Date(message.createdAt).toLocaleString('en-IN', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}</span>
            </div>
          ))}
         
            </div>

        <div  className = {styles['chat-input-area']}>
            <input type="text" ref={messageRef} placeholder="Type a message..."  className = {styles['chat-input']} id = "chat-input"/>
            <button className = {styles['send-button']} onClick = {sendMessage}>Send</button>
        </div>
    </div>
    </>
  )
}

export default ChatBox

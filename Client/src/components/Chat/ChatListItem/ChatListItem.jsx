import React from "react"
import { useSelector , useDispatch } from "react-redux"
import { addChatId } from "../../../user/chatSlice"
import { addReceiver } from "../../../user/receiverSlice"
import styles from './chatListItem.module.css'


function ChatListItem({receiverName , id , receiverId , setUpdate , update}) {
const dispatch = useDispatch()

function redirectChatBox() {
    dispatch(addChatId(id))
    const not = !update
   console.log(not)
    dispatch(addReceiver({
        receiverName,
        receiverId,
    }))
     setUpdate(not)
    console.log(id , receiverId , receiverName)
    // console.log('me click ho rha hu')
}
  

    return (
        <>
            <li className={styles['contact-item']} onClick = {redirectChatBox}>
                <div className={styles['contact-avatar']}>Js</div>
                <div className={styles['contact-info']}>
                    <span className={styles['contact-name']}>{receiverName}</span>
                    <span className={styles['last-message']}>this is the new one...</span>
                </div>
                <span className={styles['time']}>1:00 PM</span>
            </li>
        </>
    )
}




export default ChatListItem
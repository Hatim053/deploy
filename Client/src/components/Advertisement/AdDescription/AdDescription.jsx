import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./adDescription.module.css"
import { useSelector , useDispatch } from "react-redux"
import { addReceiver } from "../../../user/receiverSlice.js"
import { addChatId } from "../../../user/chatSlice.js"
import Header from '../../Header/Header.jsx'
import Footer from '../../Footer/Footer.jsx'

function AdDescription() {
  const navigate = useNavigate()
  const ad = useSelector(state => state.selectedAd)
  const dispatch = useDispatch()
  const [mainImage, setMainImage] = useState(ad.images[0])
  const currentUserId = useSelector(state => state.loggedInUser?._id)

function redirectChat() {
  if(!currentUserId) {
    navigate('/user-login');
    return;
  }
  // fetching chatId
  fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/api/chat/find/${currentUserId}/${ad.sellerId}` , {
    method : 'GET',
    headers: {
    "Content-Type": "application/json",
  },
  credentials : "include",
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.status == 200) {
      dispatch(addChatId(data.chat._id))
    }
  })

  dispatch(
  addReceiver(
  {
  receiverId : ad.sellerId ,
   receiverName : ad.sellerUserame,
   }
  )
  )
  console.log( {
  sellerId : ad.sellerId ,
  sellerName : ad.sellerUsername,
   })
  navigate('/chat')
}


async function handleDeleteAd() {
  let response = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/delete-ad/${ad._id}` , {
    method : 'GET',
    credentials : 'include',
  })
  let res = await response.json()
  if(res.status == 200) navigate('/profile-feed/my-advertisements')

}
  return (
    <>
    <Header />
      {/* GO BACK BUTTON */}
      <button className={styles.goBackBtn} onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      <div className={styles.adDetailsContainer}>
        {/* IMAGE SECTION */}
        <div className={styles.imageSection}>
          <img src={mainImage} className={styles.mainImage} />

          <div className={styles.thumbnailRow}>
            {ad.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`${styles.thumb} ${mainImage === img ? styles.activeThumb : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className={styles.detailsSection}>
          <h1 className={styles.adTitle}>{ad.title}</h1>
          <p className={styles.adPrice}>{`₹${ad.price}`}</p>

          <p className={styles.adDescription}>
            {ad.description}
          </p>

          <div className={styles.sellerInfo}>
            <img src={ad.sellerImage || 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} className={styles.sellerImg} />
            <div>
              <h3 className={styles.sellerName}>{ad.sellerUsername || 'user'}</h3>
              <p className={styles.joinedDate}>Joined: Jan 2024</p>
            </div>
          </div>

          {ad.sellerId != currentUserId ?  <button className={styles.chatBtn} onClick = {redirectChat}>Chat with Seller</button> : ''}
         { ad.sellerId == currentUserId ? <button className={styles.chatBtn} onClick = {handleDeleteAd}>Delete Advertisement</button> : ''}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdDescription

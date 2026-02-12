import React, { useEffect, useState } from "react"
import styles from './banner.module.css'
import { imgData } from "./Images/imageData"


function Banner() {
const [activeImgIdx , setActiveImgIdx] = useState(0)

useEffect(() => {
let timerId = setInterval(() => {
handleImg()
},2000)
return () => {
clearInterval(timerId)
}
 } , [])

 function handleImg() {
  setActiveImgIdx((activeImgIdx) => (activeImgIdx+1)%imgData.length)
 }


    return (
        <>
        
 <div class={styles.bannerContainer}>
 
   <img src={imgData[activeImgIdx].img} alt="" className = {styles.bannerImg}></img>
    <div class={styles.overlay}></div>

    <div class={styles.bannerContent}>
        <h1>{imgData[activeImgIdx].title}</h1>
        <p>{imgData[activeImgIdx].text}</p>
        {imgData[activeImgIdx].action && <button>{imgData[activeImgIdx].action}</button>}
    </div>
</div>
        </>
    )
}

export default Banner
import React from "react"
import styles from './banner.module.css'
import banner from './1000049530.jpg'


function Banner() {


    return (
        <>
        
                 <img src={banner} alt="" className = {styles.bannerImg}></img>
        </>
    )
}

export default Banner
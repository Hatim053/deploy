import React, { useEffect, useState } from "react"
import styles from './feed.module.css'
import AdvertisementCard from '../Advertisement/AdvertisementCard/AdvertisementCard.jsx'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addAd } from '../../user/adSlice.js'


function Feed({searchResult , page , limit}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    function handleDescription(advertisement) {
    dispatch(addAd(advertisement))
    navigate('/adDescription')
    }
    console.log(searchResult)
    const startIdx = (page-1)*limit
    const endIdx = startIdx + limit
    return (
        <>
            <div className={styles.feed}>
               
             {! searchResult && <span className = {styles['empty']}>No Service Found For Your Area</span> } 
            {/* { console.log(searchResult)} */}
             { searchResult && searchResult.slice(startIdx , endIdx).map((ad) => {
              return  <AdvertisementCard ad = {ad} handleDescription = {handleDescription} />
             })}

            </div>
        </>
    )
}

export default Feed
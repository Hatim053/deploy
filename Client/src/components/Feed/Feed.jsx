import React, { useEffect, useState } from "react"
import styles from './feed.module.css'
import AdvertisementCard from '../Advertisement/AdvertisementCard/AdvertisementCard.jsx'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addAd } from '../../user/adSlice.js'
import { useSelector } from "react-redux"

function Feed() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchedAds = useSelector(state => state.searchedAds)
    console.log(searchedAds)
    function handleDescription(advertisement) {
    dispatch(addAd(advertisement))
    navigate('/adDescription')
    }
    return (
        <>
            <div className={styles.feed}>
             {(searchedAds == null || searchedAds.length == 0) ? <span className = {styles['empty']}>No Service Found For Your Area</span> : searchedAds.map((ad) => {
              return  <AdvertisementCard ad = {ad} handleDescription = {handleDescription} />
             })}
            </div>
        </>
    )
}

export default Feed
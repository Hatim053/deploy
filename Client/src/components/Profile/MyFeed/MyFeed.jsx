import React, { useEffect, useState } from "react"
import styles from './myFeed.module.css'
import { useNavigate } from "react-router-dom"
import { useSelector  , useDispatch } from "react-redux"
import { addAd } from '../../../user/adSlice.js'
import AdvertisementCard from '../../Advertisement/AdvertisementCard/AdvertisementCard.jsx'

function MyFeed() {


const navigate = useNavigate()
    const dispatch = useDispatch()
    const [sellerAds , setSellerAds] = useState([])
    function handleDescription(advertisement) {
    dispatch(addAd(advertisement))
    navigate('/adDescription')
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/my-ads` , {
            method : 'GET',
            credentials : 'include',
        })
        .then((res) => res.json())
        .then((data) => {
             console.log(data.myadvertisements)
            setSellerAds(data.myadvertisements)
        })
    } , [])
    return(
        <>
        <div className = {styles['wrapper']}>
 <div className={styles['my-feed']}>
             {(sellerAds == null || sellerAds.length == 0) ? <span className = {styles['empty']}>you didn't post anything</span> : sellerAds.map((ad) => {
              return  <AdvertisementCard ad = {ad} handleDescription = {handleDescription}/>
             })}
            </div>
</div>
        </>


    )
} 


export default MyFeed
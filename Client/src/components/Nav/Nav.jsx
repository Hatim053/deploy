import React from "react"
import styles from './nav.module.css'


function Nav({ getAdvertisements }) {


    return (
        <>
        <nav className = {styles.nav}>
           
            <span onClick = {(e) => {
               getAdvertisements(e.target.innerText)
            }}>furniture</span>
            <span onClick = {(e) => {
                getAdvertisements(e.target.innerText)
            }}>properties & spaces</span>
            <span  onClick = {(e) => {
                getAdvertisements(e.target.innerText)
            }}>electronics & applainces</span>
            <span  onClick = {(e) => {
                getAdvertisements(e.target.innerText)
            }}>lighting & decor</span>
            <span  onClick = {(e) => {
                setSearchedQuery(e.target.value)
            }}>photography</span>
            <span onClick = {(e) => {
                getAdvertisements(e.target.innerText)
            }}>other services</span>
        </nav>
        </>
    )
}


export default Nav
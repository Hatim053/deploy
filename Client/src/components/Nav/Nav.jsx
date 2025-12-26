import React from "react"
import styles from './nav.module.css'


function Nav({ setSearchedQuery }) {


    return (
        <>
                <nav className = {styles.nav}>
            <a href="" onClick = {(e) => {
                setSearchedQuery(e.target.innerHtml)
            }}>OUR-SERVICES</a>
            <a href="" onClick = {(e) => {
                setSearchedQuery(e.target.innerHtml)
            }}>furniture</a>
            <a href="" onClick = {(e) => {
                setSearchedQuery('properties & spaces')
            }}>properties & spaces</a>
            <a href="" onClick = {(e) => {
                setSearchedQuery(e.target.innerHtml)
            }}>electronics & applainces</a>
            <a href="" onClick = {(e) => {
                setSearchedQuery('lighting & decoration')
            }}>Lighting & Decor</a>
            <a href="" onClick = {(e) => {
                setSearchedQuery(e.target.value)
            }}>photography</a>
            <a href="" onClick = {(e) => {
                setSearchedQuery('other services')
            }}>Events And More</a>
        </nav>
        </>
    )
}


export default Nav
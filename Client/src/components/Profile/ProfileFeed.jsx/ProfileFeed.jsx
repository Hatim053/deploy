import React from "react"
import { useState } from "react"
import styles from './profileFeed.module.css'
import SideBar from '../Sidebar/Sidebar.jsx'
import AccountInfo from "../AccountInfo/AccountInfo.jsx"
import PaymentHistory from "../PaymentHistory/PaymentHistory.jsx"
import Subscription from "../Subscription/Subscription.jsx"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Header from "../../Header/Header.jsx"

function ProfileFeed() {
const [activeMenu, setActiveMenu] = useState("account-info")
  const loggedInUser = useSelector(state => state.loggedInUser)

    return (
        <>
        <Header />
        <div className={styles['container']}>
         <SideBar activeMenu = {activeMenu} setActiveMenu = {setActiveMenu} loggedInUser = {loggedInUser} />
        <Outlet />
        </div>
        </>
    )
}

export default ProfileFeed
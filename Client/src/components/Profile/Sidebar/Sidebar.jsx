import React from "react"
import styles from "./sidebar.module.css"
import { FaHome, FaUserCircle, FaMoneyCheckAlt, FaHistory, FaSignOutAlt , FaBullhorn } from "react-icons/fa"
import { data, useNavigate } from "react-router-dom"
import { useSelector , useDispatch } from "react-redux"


const Sidebar = ({ activeMenu, setActiveMenu , loggedInUser}) => {

  console.log(loggedInUser.accountType)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleMenuClick = (menu, route) => {
    if(menu == 'my-advertisements' && loggedInUser.accountType == 'seller') {
          fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/my-ads` , {
      method : 'GET',
      credentials : 'include',
    })
    .then((res) => res.json())
    .then((data) => dispatch(addSearchedAds(data.myadvertisements)))
  }
    setActiveMenu(menu)
    navigate(route)
  };

  return (
    <div className={styles.sidebar}>

      <div className={styles.menu}>
        <div
          className={`${styles.menuItem} ${activeMenu === "home" ? styles.active : ""}`}
          onClick={() => handleMenuClick("home", "/")}
        >
          <FaHome size={20} /> Home
        </div>

        <div
          className={`${styles.menuItem} ${activeMenu === "account-info" ? styles.active : ""}`}
          onClick={() => handleMenuClick("account-info", "/profile-feed/account-info")}
        >
          <FaUserCircle size={20} /> Account Info
        </div>

        <div
          className={`${styles.menuItem} ${activeMenu === "subscription" ? styles.active : ""}`}
          onClick={() => handleMenuClick("subscription", "/profile-feed/subscription")}
        >
          <FaMoneyCheckAlt size={20} /> Subscription
        </div>
          {loggedInUser.accountType == 'seller' ? <div
          className={`${styles.menuItem} ${activeMenu === "my-advertisements" ? styles.active : ""}`}
          onClick={() => handleMenuClick("my-advertisements", "/profile-feed/my-advertisements")}
        >
          <FaBullhorn size={20} /> My Advertisements

        </div> : ''}
        <div
          className={`${styles.menuItem} ${activeMenu === "transactions" ? styles.active : ""}`}
          onClick={() => handleMenuClick("transactions", "/profile-feed/payment-history")}
        >
          <FaHistory size={20} /> Last Transactions
        </div>
      </div>

      {/* <button className={styles.logoutBtn} onClick={() => {
        navigate(`/${loggedInUser.accountType}-login`)
      }}>
        <FaSignOutAlt size={18} style={{ marginRight: "8px" }} />
        Logout
      </button> */}
    </div>
  );
};

export default Sidebar;


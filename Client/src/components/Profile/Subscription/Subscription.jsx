import React, { useState } from "react"
import styles from './subscription.module.css'
import { useSelector } from "react-redux"

function Subscription() {
const user = useSelector(state => state.loggedInUser)

  async function payNow() {
    const amount = 299*100;

    // Create order by calling the server endpoint
    const response = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
    });

    const order = await response.json();

    // Open Razorpay Checkout
    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY, // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'RentPe',
      description: 'Test Transaction',
      order_id: order.id, // This is the order_id created in the backend
      handler : async function(response) {

       const body = {...response , amount }
          
      const validate = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/payment/validate-transaction` , {
        method : 'POST',
        credentials : 'include',
        headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
      })
       
      const validateResponse = await validate.json()
            console.log(validateResponse)
    window.location.href = `${import.meta.env.VITE_CLIENT_SIDE_URL}/profile-feed/payment-history`  // replace this with the page showing transaction details

      },
      prefill: {
        name: user?.username || 'user',
        email: user?.email || 'user',
        contact: user?.mobileNo || '8770956153',
      },
      theme: {
        color: '#F37254'
      },
      
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed' , async function(response) {
      const razorpay_payment_id = response.error.metadata.payment_id
      const body = {razorpay_payment_id , amount }
      const data = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/payment/failed-transaction` , {
        method : 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(body)
      })
      
      const dataResponse = await data.json();

     
window.location.href = `${import.meta.env.VITE_CLIENT_SIDE_URL}/payment-history` 
    })

   rzp.open();
  
  }

  return (
    <>
 

<div className={styles["container"]}>
    <header  className = {styles['page-header']}>
        <h1>Choose Your Plan</h1>
        <p>Unlock the full potential of our platform with the right plan for you.</p>
    </header>

    <main  className = {styles['pricing-container']}>

        <div  className = {`${styles['plan-card']} ${styles['free-plan']} ${styles['active-plan']}`}>
            <div  className = {styles['plan-header']}>
                <h2  className = {styles['plan-title']}>Free Basic</h2>
                <p  className = {styles['plan-tagline']}>Start exploring at no cost</p>
            </div>

            <div  className = {styles['plan-price']}>
                <span  className = {styles['price-value']}>Free</span>
            </div>

            <ul className = {styles['plan-features']}>
                <li  className = {styles['feature-item']}>
                    <span  className = {styles['check-icon']}>&#10003;</span>
                    **3** Advertisements per month
                </li>
                <li  className = {styles['feature-item']}>
                    <span  className = {styles['check-icon']}>&#10003;</span>
                    Basic analytics
                </li>
                <li  className = {styles['feature-item-excluded']}>
                    <span  className = {styles['check-icon']}>&#10003;</span>
                    Default Activated
                </li>
            </ul>

            <button  className = {`${styles['plan-button']} ${styles['current-button']}`} disabled>Current Plan</button>
        </div>
        <div className = {`${styles['plan-card']} ${styles['paid-plan']}`}>
            <div  className = {styles['plan-badge']}>Most Popular</div>
            <div  className = {styles['plan-header']}>
                <h2 className = {styles['plan-title']}>Premium Ad</h2>
                <p  className = {styles['plan-tagline']}>Maximize your reach and impact</p>
            </div>

            <div  className = {styles['plan-price']}>
                <span  className = {styles['price-value']}>₹299</span>
                <span  className = {styles['price-period']}>/ 28 days</span>
            </div>

            <ul className = {styles['plan-features']}>
                <li  className = {styles['feature-item']}>
                    <span  className = {styles['check-icon']}>&#10003;</span>
                    **Unlimited** Ads per month
                </li>
                <li className = {styles['feature-item']}>
                    <span  className = {styles['check-icon']}>&#10003;</span>
                    Priority support
                </li>
                <li  className = {styles['feature-item']}>
                    <span  className = {styles['check-icon']}>&#10003;</span>
                    Advanced performance reports
                </li>
            </ul>

            <button  class="plan-button buy-now-button" className = {`${styles['plan-button']} ${styles['buy-now-button']}`} onClick = {payNow}>Buy Now</button>
        </div>
        </main>

</div>

    </>
  )
}

export default Subscription

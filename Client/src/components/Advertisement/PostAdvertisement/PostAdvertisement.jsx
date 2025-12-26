import React, { useRef } from "react"
import { useEffect } from "react"
import styles from './postAdvertisement.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostAdvertisement() {
  useEffect(() => {
   
    document.body.classList.add(styles.bodyBase);
    document.body.classList.add(styles.createAdBackground);

 
    return () => {
      document.body.classList.remove(styles.bodyBase);
      document.body.classList.remove(styles.createAdBackground);
    };
  }, []);



  const navigate = useNavigate()



   function handleCreateAd() {
    return async(e) => {
      e.preventDefault()
    
      const formData = new FormData(e.target)
      let response = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/ad/create` , {
        method : 'POST',
        credentials: "include",
        body : formData,

      })

      let data = await response.json()
     
      console.log(data)
      if(data.status == 201)  navigate('/') // create this route
      if(data.status == 405) navigate(data.redirectUrl)
      if(data.status == 406) console.log('token expired')
      if(data.status == 407) navigate('/profile-feed/subscription')
      // console.log(data.status)
     }

   } 

    return (
        <>
        <div  className = {styles.mainWrapper}>
           <button className = {styles['back-btn']} onClick = {() => navigate(-1)}>← Back</button>
          <div  className = {styles.formContainer}>
    <h2>Post Your Ad</h2>
    <form  onSubmit = {handleCreateAd()}>
      <div  className = {styles.formGroup}>
        <label htmlFor="title">Ad Title</label>
        <input type="text" id="title" name="title" placeholder="Enter ad title" required />
      </div>

      <div className = {styles.formGroup}>
        <label htmlFor="serviceType">Service Type</label>
        <select  id="serviceType" name="serviceType" required>
          <option value="">Select service type</option>
          <option value="furniture">Furniture</option>
          <option value="properties & spaces">Properties & Spaces</option>
          <option value="electronics & applainces">Electronics & Applainces</option>
          <option value="catering  & serving">Catering & Serving</option>
          <option value="lighting & decoration">Lighting & Decoration</option>
          <option value="lighting & decoration">Photography</option>
          <option value="other services">Other Services</option>
        </select>
      </div>

      <div className = {styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea  id="description" name="description" placeholder="Describe your ad..." required></textarea>
      </div>
      <div className = {styles.formGroup}>
        <label htmlFor="price">Price</label>
        <input   type="text" id="price" name="price" placeholder="ex : 1000/perday" required />
      </div>
      <div className = {styles.formGroup}>
        <label htmlFor="city">City</label>
        <input  type="text" id="city" name="city" placeholder="Enter city name" required />
      </div>

      <div className = {styles.formGroup}>
        <label htmlFor="address">Address</label>
        <textarea   id="address" name="address" placeholder="Enter full address" required></textarea>
      </div>

      <div className = {styles.formGroup}>
        <label htmlFor="mobileNo">Mobile Number</label>
        <input   type="tel" id="mobileNo" name="mobileNo" placeholder="Enter your mobile number" pattern="[0-9]{10}" required />
      </div>

      <div className = {styles.formGroup}>
        <label htmlFor="images">Upload Images</label>
        <input type="file" id="images" name="images" accept="image/*" multiple required />
      </div>

      <input type="submit" className = {styles.publishBtn} value = "Make Public"/>
    </form>
  </div>
</div>
        </>
    )
}
 


export default PostAdvertisement
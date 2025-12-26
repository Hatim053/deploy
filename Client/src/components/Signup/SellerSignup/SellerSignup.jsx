import { React , useState , useRef , useEffect } from "react"
import styles from "./sellerSignup.module.css"
import {useNavigate} from 'react-router-dom'
function SellerSignup() {
  useEffect(() => {
   
    document.body.classList.add(styles.bodyBase);
    document.body.classList.add(styles.createAdBackground);

 
    return () => {
      document.body.classList.remove(styles.bodyBase);
      document.body.classList.remove(styles.createAdBackground);
    };
  }, []);
const [selectedCategories, setSelectedCategories] = useState([])
const navigate = useNavigate()
const nameRef = useRef(null)
const emailRef = useRef(null)
const usernameRef = useRef(null)
const passwordRef = useRef(null)
const numberRef = useRef(null)
const cityRef = useRef(null)


  const categories = [
    "furniture",
    "utensils",
    "properties",
    "electronics",
    "lighting",
    "catering",
    "decoration",
    "tent",
    "photography",
  ]

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target

    if (checked) {
      setSelectedCategories((prev) => [...prev, value])
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value))
    }
  };

   function handleSignup() {
   return async (e) => {
    e.preventDefault()
   
    const response = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/seller/signup` , {
    method : 'POST',
    headers : {
    "Content-Type": "application/json",
  },
  body : JSON.stringify({
    fullName : nameRef.current.value,
    email : emailRef.current.value,
    username : usernameRef.current.value,
    password : passwordRef.current.value,
    location : cityRef.current.value,
    mobileNo : numberRef.current.value,
    businessType : selectedCategories,
  })
    })

    let data = await response.json()
    if(data.status == 201 || data.status == 401) {
     redirectLogin()
    }
   }
   }

   function redirectLogin() {
   navigate('/seller-login')
   }

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleText}>
                <div className={styles.title}>Become A Seller</div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.formInner}>
                    <form className={styles.signup} onSubmit = {handleSignup()}>
                        <div className={styles.field}>
                            <input ref = {nameRef} type="text" placeholder="Full Name" required />
                        </div>

                        <div className={styles.field}>
                            <input ref = {emailRef} type="email" placeholder="Email Address" required />
                        </div>

                        <div className={styles.field}>
                            <input ref = {usernameRef} type="text" placeholder="Username" required />
                        </div>

                        <div className={styles.field}>
                            <input ref = {numberRef} type="number" placeholder="Enter Your Number" required />
                        </div>

                        <div className={styles.field}>
                            <input ref = {passwordRef} type="password" placeholder="Password" required />
                        </div>
                        <div className={styles.field}>
                            <input ref = {cityRef} type="text" placeholder="Enter Your City" required />
                        </div>
                
                         <div className={styles.field}>
              <label className={styles.categoryLabel}>Choose Your Business Category:</label>
              <div className={styles.categoryOptions}>
                {categories.map((category, index) => (
                  <label key={index} className={styles.categoryOption}>
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCheckboxChange}
                      checked={selectedCategories.includes(category)}
                    />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </label>
                ))}
              </div>
            </div>

                        <div className={`${styles.field} ${styles.btn}`}>
                            <div className={styles.btnLayer}></div>
                            <input type="submit" value="Signup"  />
                        </div>

                        <div className={styles.signupLink}>
                            Already have an account? <a onClick = {redirectLogin}>Login now</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerSignup

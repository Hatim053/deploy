import React from "react"
import styles from "./userSignup.module.css"
import { useRef , useState , useEffect } from "react"
import { useNavigate } from 'react-router-dom'



function UserSignup() {
    useEffect(() => {
   
    document.body.classList.add(styles.bodyBase);
    document.body.classList.add(styles.createAdBackground);

 
    return () => {
      document.body.classList.remove(styles.bodyBase);
      document.body.classList.remove(styles.createAdBackground);
    };
  }, []);
const [showPopup, setShowPopup] = useState(false);
const usernameRef = useRef(null)
const emailRef = useRef(null)
const passwordRef = useRef(null)
const navigate = useNavigate()

 function handleSignup() {
  console.log(import.meta.env.SERVER_SIDE_URL)
  return async(e) => {
    e.preventDefault()
  let response = await fetch(`${import.meta.env.VITE_SERVER_SIDE_URL}/user/signup` , {
    method : 'POST',
    headers: {
    "Content-Type": "application/json",
  },
  body : JSON.stringify({
    username : usernameRef.current.value,
    email : emailRef.current.value,
    password : passwordRef.current.value,
  })
  })

  let data = await response.json()
  if(data.status == 201 || data.status == 401) {
redirectLogin()
  } 
  }
} 

function redirectLogin() {
  navigate('/user-login')
}

  return (


    <div className={styles.wrapper}>
      <div className={styles.titleText}>
        <div className={styles.title}>Register User</div>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.formInner}>
          <form className={styles.signup} onSubmit={handleSignup()}>

            <div className={styles.field}>
              <input ref={emailRef} type="email" placeholder="Email Address" required />
            </div>

            <div className={styles.field}>
              <input ref={usernameRef} type="text" placeholder="Username" required />
            </div>

            <div className={styles.field}>
              <input ref={passwordRef} type="password" placeholder="Password" required />
            </div>

            <div className={`${styles.field} ${styles.btn}`}>
              <div className={styles.btnLayer}></div>
              <input type="submit" value="Signup" />
            </div>

            <div className={styles.signupLink}>
              Already have an account? <a onClick = {redirectLogin}>Login now</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;

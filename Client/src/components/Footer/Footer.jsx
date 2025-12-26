import React from "react"
import styles from './footer.module.css'

function Footer() {


    return (
        <>
 <footer className={styles["footer"]}>
      <div className={styles["footer-container"]}>

        <div className={styles["footer-col"]}>
          <h3 className={styles["footer-logo"]}>RentPe</h3>
          <p>RentPe is a trusted platform that connects users with quality products and services worldwide.</p>
          <div className={styles["social-links"]}>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        <div className={styles["footer-col"]}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className={styles["footer-col"]}>
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Report a problem</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className={styles["footer-col"]}>
          <h4>Subscribe</h4>
          <p>Stay updated with our latest news and offers.</p>
          <form className={styles["subscribe-form"]}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      <p className={styles["footer-bottom"]}>
        © 2025 YourBrand — All Rights Reserved.
      </p>
    </footer>
        </>
    )
}

export default Footer
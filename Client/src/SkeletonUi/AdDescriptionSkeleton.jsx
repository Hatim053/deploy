import React from "react"
import styles from './adDescriptionSkeleton.module.css'

function AdDescriptionSkeleton  () {
  return (
    <>
      <div className={styles.goBackSkeleton}></div>

      <div className={styles.adDetailsContainer}>
        {/* IMAGE SECTION */}
        <div className={styles.imageSection}>
          <div className={`${styles.skeleton} ${styles.mainImageSkeleton}`} />

          <div className={styles.thumbnailRow}>
            {[1, 2, 3, 4].map((_, i) => (
              <div
                key={i}
                className={`${styles.skeleton} ${styles.thumbSkeleton}`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className={styles.detailsSection}>
          <div className={`${styles.skeleton} ${styles.titleSkeleton}`} />
          <div className={`${styles.skeleton} ${styles.priceSkeleton}`} />

          <div className={`${styles.skeleton} ${styles.descSkeleton}`} />

          <div className={styles.sellerInfo}>
            <div className={`${styles.skeleton} ${styles.sellerImgSkeleton}`} />
            <div>
              <div className={`${styles.skeleton} ${styles.nameSkeleton}`} />
              <div className={`${styles.skeleton} ${styles.dateSkeleton}`} />
            </div>
          </div>

          <div className={`${styles.skeleton} ${styles.buttonSkeleton}`} />
        </div>
      </div>
    </>
  );
};


export default AdDescriptionSkeleton
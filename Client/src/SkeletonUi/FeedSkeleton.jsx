import styles from './feedSkeleton.module.css'

function FeedSkeleton() {
 const cards = [1,2,3,4,5,6,7,8]

    return (
        <div className={styles.feed}>
  {
    
      cards.map(() => ( <div className={styles.advertisementShimmer}>
  <div className={styles.imgShimmer}></div>

  <div className={styles.priceShimmer}></div>
  <div className={styles.titleShimmer}></div>

  <div className={styles.textShimmer}>
    <span className={styles.areaShimmer}></span>
    <span className={styles.dateShimmer}></span>
  </div>
</div>)

      )
  }
</div>

    )
}

export default FeedSkeleton
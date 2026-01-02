import styles from './pagination.module.css'


const Pagination = ({page , setPage , stop}) => {
  return (
    <div className={styles.paginationContainer}>
    
      <button disabled = {page==1} className={styles.navButton} onClick = {() => setPage(page-1)}>&lsaquo;</button>

      <div className={styles.pages}>
        <button className={styles.page}>{page-1}</button>
        <button className={`${styles.page} ${styles.active}`}>{page}</button>
        <button className={styles.page}>{page+1}</button>
        <span className={styles.dots}>...</span> 
      </div>

      <button disabled={!stop} className={styles.navButton} onClick = {() => setPage(page+1)}>&rsaquo;</button>

    </div>
  )
}

export default Pagination
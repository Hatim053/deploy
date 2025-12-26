import styles from "./header.module.css"

function SearchSuggestions() {
  return (
    <ul className={styles.suggestionList}>
      <li className={styles.suggestionItem}>Wooden Sofa</li>
      <li className={styles.suggestionItem}>Office Chair</li>
      <li className={styles.suggestionItem}>Study Table</li>
      <li className={styles.suggestionItem}>Bed with Storage</li>
      <li className={styles.suggestionItem}>Dining Table</li>
    </ul>
  )
}

export default SearchSuggestions

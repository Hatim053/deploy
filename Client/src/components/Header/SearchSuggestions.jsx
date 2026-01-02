import styles from "./header.module.css"

function SearchSuggestions({ suggestionList , setSuggestionList , getSearchedAdvertisements ,setPage }) {
  return (
    <ul className={styles.suggestionList}>
      {suggestionList?.map((item) => (
      <li className={styles.suggestionItem} onClick = {() => {
        getSearchedAdvertisements(item.serviceType , 1)
        setPage(1)
        setSuggestionList(null)
      }}>{item.title}</li>
      ))}
    </ul>
  )
}

export default SearchSuggestions

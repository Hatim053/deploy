import {configureStore} from '@reduxjs/toolkit'
import loggedInUserReducer from '../user/userSlice.js'
import selectedAdReducer from '../user/adSlice.js'
import receiverIdReducer from '../user/receiverSlice.js'
import chatIdReducer from '../user/chatSlice.js'
import searchedAdsReducer from '../user/feedSlice.js'


export const store = configureStore({
   reducer: {
  loggedInUser: loggedInUserReducer,
  selectedAd : selectedAdReducer,
  receiver : receiverIdReducer,
  chatId : chatIdReducer,
  searchedAds : searchedAdsReducer,
}
   
})
import { createSlice } from "@reduxjs/toolkit"
const initialState = null

export const feedSlice = createSlice({
    name : 'searchedAds',
    initialState,
    reducers : {
        addSearchedAds : (state , action) => {
            return action.payload
        },
        removeSearchedAds : (state , action) => {
            return null
        }
    }
})


export const {addSearchedAds , removeSearchedAds} = feedSlice.actions
export default feedSlice.reducer
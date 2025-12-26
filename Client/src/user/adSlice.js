import { createSlice } from "@reduxjs/toolkit"
const initialState = null

export const adSlice = createSlice({
    name : 'selectedAd',
    initialState,
    reducers : {
        addAd : (state , action) => {
            return action.payload
        },
        removeAd : (state , action) => {
            return null
        }
    }
})

export const {addAd , removeAd} = adSlice.actions
export default adSlice.reducer
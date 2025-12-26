import { createSlice } from "@reduxjs/toolkit"

const initialState = null

export const receiverSlice = createSlice({
    name : 'receiver',
    initialState,
    reducers : {
        addReceiver : (state , action) => {
         return action.payload
        },
        removeReceiver : (state , action) => {
         return null
        }
    }
})


export const { addReceiver , removeReceiver } = receiverSlice.actions
export default receiverSlice.reducer
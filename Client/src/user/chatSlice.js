import { createSlice } from "@reduxjs/toolkit"

const initialState = null

export const chatSlice = createSlice({
    name : 'chatId',
    initialState,
    reducers : {
        addChatId : (state , action) => {
            return action.payload
        },
        removeChatId : (state , action) => {
            return null
        }
    }
})


export const { addChatId , removeChatId } = chatSlice.actions
export default chatSlice.reducer

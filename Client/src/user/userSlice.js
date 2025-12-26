import { createSlice } from '@reduxjs/toolkit'


const initialState = null

export const userSlice = createSlice({
    name : 'loggedInUser',
    initialState,
    reducers : {
        addUser : (state , action) => {
            return action.payload
        },
        removeUser : (state , action) => {
           return null
        }
    }
})


export const { addUser , removeUser } = userSlice.actions
export default userSlice.reducer


import { createSlice } from "@reduxjs/toolkit"
import { getToken } from '../services/AsyncStorageService'

const authSlice = createSlice({
    name: 'auth',
    initialState: { userToken: null ,isLoading:false },
    reducers: {
        login: (state, action) => {
            // console.warn(action.payload);
            // isSignedIn=action.payload;
            console.warn("triggered")
            state.userToken='jbsjhbjhbjs'
            state.isLoading=false
            //  state.token=getToken() //getting token from storage
            //  if(token!==null){
            //     isSignedIn=true;
            //  }
            // const { accessToken } = action.payload
            // state.token = accessToken
        },
        logOut: (state, action) => {
            state.userToken=null //getting token from storage 
            state.isLoading=false  
            console.warn("triggered")

         }
    },
})

export const { login, logOut } = authSlice.actions

export default authSlice

export const selectCurrentToken = (state) => state.auth.userToken
export const selectIsLoading = (state) => state.auth.isLoading
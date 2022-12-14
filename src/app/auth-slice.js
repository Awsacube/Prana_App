import { createSlice } from "@reduxjs/toolkit"
import { getToken } from '../services/AsyncStorageService'

const authSlice = createSlice({
    name: 'auth',
    initialState: { userToken: 0},
    reducers: {
        login: (state, action) => {
            if(state.userToken===0){
                state.userToken=1
                console.log("chnagedredux")
            }
            else if(state.userToken===1){
                state.userToken=0
                console.log("chnagedredux")
            }
            // if(action.payload===0){
            //     console.warn("payload",action.payload)
            //     state.userToken=action.payload
            // }
            // console.warn(action.payload);
            // isSignedIn=action.payload;
            // console.warn("triggered")
            // state.userToken=true
            // state.isLoading=false
            //  state.token=getToken() //getting token from storage
            //  if(token!==null){
            //     isSignedIn=true;
            //  }
            // const { accessToken } = action.payload
            // state.token = accessToken
        },
        logOut: (state, action) => {
            state.userToken=false //getting token from storage 
            // state.isLoading=false  

         }
    },
})

export const { login, logOut } = authSlice.actions

export default authSlice

export const selectCurrentToken = (state) => state.auth.userToken
export const selectIsLoading = (state) => state.auth.isLoading
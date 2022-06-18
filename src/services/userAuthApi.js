// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../services/AsyncStorageService';

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-pillbox.nextgensolutions.io/api/' ,

  // prepareHeaders: (headers, { getState }) => {
  //   const token = getToken();

  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`)
  //   }
  //   console.log("logingheaders",headers)
  //   console.log(token);
  //   return headers
  // },

  
}),
 
  endpoints: (builder) => ({
    registerUser:builder.mutation({
      query:(user)=>{
        return{
          url:'auth/signup',
          method:'POST',
          body:user,
          headers:{
            //can pass token here
            'Content-type':'application/json',
          }
        }
      }
    }),
    loginUser:builder.mutation({
      query:(user)=>{
        return{
          url:'auth/login',
          method:'POST',
          body:user,
          headers:{
            //can pass token here
            'Content-type':'application/json',
          }
        }
      }
    }),
    getLoggedUser:builder.query({ // getting info of user that logged in
      query:(token)=>{
        return{
          url:'users/profile',
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`,
          }
        }
      },
    }),
     userLogOut:builder.mutation({ 
        query:(token)=>{
          return{
            url:'auth/logout',
            method:'POST',
            // headers:{
            // }
            body:{
              'token':`${token}`,
            }
          }
        }
      }),
    categories:builder.query({
      query:(token)=>{
       return{ url:'/filters',
        method:'GET',
        headers:{
          'Authorization':`Bearer ${token}`,
        }
      }
      }
    }),
    subcategories:builder.query({
      query:(queryItems)=>{
      return{ 
        url: `/filters?category_id=${queryItems.id}`,
        method:'GET',
        headers:{
          'Authorization':`Bearer ${queryItems.token}`,
        }
      }
      }
    }),
    getproductsbyfilterid:builder.query({
      query:(queryItems)=>{
        return{
          url:`/filters/products/${queryItems.id}`,
          // url:'/filters/products/a8d4974f-fb86-46da-a781-7558bb350c51',
          method:'GET',
          headers:{
            'Authorization':`Bearer ${queryItems.token}`,
            // 'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjY5ODA1YTUwLWUwY2UtNGU2OS1iOTg4LTNjYjhkOTg0ZTA1ZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjUxMDc4MTk2LCJleHAiOjE2NTExNjQ1OTZ9.uE1tKkWvCxP8Q3Uq73sED19nY6x16zojTyXmYBnj5vU'
          }
        }

      }
    }),
    getProduct:builder.query({
      query:(id)=>{
        return{
          url:`/products/${id}`,
          method:'GET'
        }
      }
    }),
    addToCart:builder.mutation({
      query:(cartData)=>{
        return{
          url:'/cart',
          method:'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${cartData.token}`,
          },
          body:{
            'quantity':`${cartData.quantity}`,
            'product_id':`${cartData.id}`
          }
        }
      }
    }),
    getAllCartItems:builder.query({
      query:(token)=>{
        return{
          url:'/cart',
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${token}`,
          }
        }
      }
    }),
    deleteCartItems:builder.mutation({
      query:(remove)=>{
        console.warn("deletcart",remove)
        return{
          url:`/cart/${remove.id}`,
          method:'DELETE',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${remove.token}`,
          }
        }
      }
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useAddToCartMutation,useRegisterUserMutation,useLoginUserMutation,useGetLoggedUserQuery,useUserLogOutMutation,useProductsQuery,useCategoriesQuery,useSubcategoriesQuery,useGetproductsbyfilteridQuery,useGetProductQuery,useGetAllCartItemsQuery,useDeleteCartItemsMutation} = userAuthApi
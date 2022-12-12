// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://65.2.191.114:9000/api' ,
  // prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token
    // If we have a token set in state, let's assume that we should be passing it.
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`)
    // }
    // console.log("logingheaders",headers)
    // console.log(token);
    // return headers 
  // }
}),
 
  endpoints: (builder) => ({
    //Auth End Points//
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
      query:(formData)=>{
        // console.log("formData",formData)
        return{
          url:'auth/login',
          method:'POST',
          body:formData,
          headers:{
            //can pass token here
            'Content-type':'application/json',
          }
        }
      }
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
      //Profile End Points
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
      editProfile:builder.mutation({
        query:(newData)=>{
          console.warn(newData)
          return{
            url:'users/profile',
            method:'PATCH',
            body:{
              "first_name": newData.first_name,
              "last_name": newData.last_name,
              "phone_number": newData.phone_number,
              "address": {
                "street_1": newData.street_1,
                "street_2": newData.street_2,
                "city": newData.city,
                "district": newData.district,
                "state": newData.state,
                "pincode": newData.pincode
            },
            },
            headers:{
              'Authorization':`Bearer ${newData.userLToken}`,
            }
          }
        },
      }),
        //Medicine End Points//
      categories:builder.query({  
      query:(token)=>{
       return{ url:'/filters',
        method:'GET',
        // headers:{
        //   'Authorization':`Bearer ${token}`,
        // }
      }
      }
    }),
    subcategories:builder.query({
      query:(queryItems)=>{
      return{ 
        url: `/filters?category_id=${queryItems.id}`,
        method:'GET',
        // headers:{
        //   'Authorization':`Bearer ${queryItems.token}`,
        // }
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
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    searchProducts:builder.query({
      query:(text)=>{
        return{
          url:`/products?page=1&limit=16&search=${text}`,
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    //Cart End Points//
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
    }),
    //Labcart end Points
    addToLabCart:builder.mutation({
      query:(cartData)=>{
        console.log("cartDataapi",cartData)
        return{
          url:'/cart/labcart',
          method:'POST',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${cartData.token}`,
          },
          body:{
            // 'quantity':`${cartData.quantity}`,
            'lab_test_id':`${cartData.id}`
          }
        }
      }
    }),
    getAllLabCartItems:builder.query({
      query:(token)=>{
        return{
          url:'/cart/labcart',
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${token}`,
          }
        }
      }
    }),
    deleteLabCartItems:builder.mutation({
      query:(remove)=>{
        // console.warn("deletcart",remove)
        return{
          url:`/cart/labcart/${remove.id}`,
          method:'DELETE',
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${remove.token}`,
          }
        }
      }
    }),
    //Brands End Points//
    getBrands:builder.query({
      query:()=>'/brands'
    }),
    //orders End Points
    getOrderHistory:builder.query({
      query:(token)=>{
        return{
          url:'/orders',
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`,
          }
        }
      }
    }),
    //Diagnostics End Points//
    getDiagnosticsHealthConcerns:builder.query({
      query:()=>{
        return{
          url:'/filters?type=TEST_HEALTH_CONCERN',
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    getTestOrganCategory:builder.query({
      query:()=>{
        return{
          url:'/filters?type=TEST_ORGAN_CATEGORY',
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    getAllTests:builder.query({
      query:()=>{
        return{
          url:'/lab/test',
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
      }
    }
    }),
    getTestsByFilter:builder.query({
      query:(id)=>{
        return{
          url:`/lab/test/category/${id}`,
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
      }
    }
    }),
    getAllPackages:builder.query({
      query:()=>{
        return{
          url:'/lab/test?is_package=true',
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
      }
    }
    }),
    TestsAndPackagesById:builder.query({
      query:(id)=>{
        return{
          url:`/lab/test?${id}`,
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
      }
    }
    }),
    searchTestsAndPackages:builder.query({
      query:(text)=>{
        console.log("searchQuery",text);
        return{
          url:`/lab/test?search=${text}`,
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
      }
    }
    }),
    //Doctors End Points//
    getConsultationHealthConcerns:builder.query({
      query:()=>{
        return{
          url:'/filters?type=CONSULTATION_HEALTH_CONCERN',
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    getConsultationSpecialization:builder.query({
      query:()=>{
        return{
          url:'/filters?type=CONSULTATION_SPECIALIZATION',
          method:'GET',
          headers:{
            'Content-type':'application/json',
          }
        }
      }
    }),
    getDoctorsBySpecialization:builder.query({
      query:(queryItems)=>{
        return{ 
          url: `/doctor/specialization/${queryItems.id}`,
          method:'GET',
          headers:{
            'Authorization':`Bearer ${queryItems.token}`,
          }
        }
        }
    }),
    getDoctor:builder.query({
      query:(queryItems)=>{
        return{ 
          url: `/doctor/${queryItems.uuid}`,
          method:'GET',
          headers:{
            'Authorization':`Bearer ${queryItems.token}`,
          }
        }
        }
    }),
    getTimeSlots:builder.query({
      query:(queryItems2)=>{
        console.warn("slots data",queryItems2)
        return{ 
          url: `/doctor/timeslot?doctor_id=${queryItems2.id}`,
          method:'GET',
          headers:{
            'Authorization':`Bearer ${queryItems2.token}`,
          }
        }
        }
    })

    // /filters?type=CONSULTATION_SPECIALIZATION
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
              useAddToCartMutation,useRegisterUserMutation,useLoginUserMutation,
              useGetLoggedUserQuery,useUserLogOutMutation,useProductsQuery,useSearchProductsQuery,
              useCategoriesQuery,useSubcategoriesQuery,useGetproductsbyfilteridQuery,
              useGetProductQuery,useGetAllCartItemsQuery,useDeleteCartItemsMutation,
              useGetBrandsQuery,useGetDiagnosticsHealthConcernsQuery,useGetConsultationSpecializationQuery,
              useGetConsultationHealthConcernsQuery,useGetDoctorsBySpecializationQuery,useGetDoctorQuery,
              useGetAllTestsQuery,useGetAllPackagesQuery,useSearchTestsAndPackagesQuery,
              useTestsAndPackagesByIdQuery,useEditProfileMutation,useGetOrderHistoryQuery,
              useGetTimeSlotsQuery,useAddToLabCartMutation,useGetAllLabCartItemsQuery,useDeleteLabCartItemsMutation,useGetTestOrganCategoryQuery,useGetTestsByFilterQuery
            } = userAuthApi


// const baseQueryWithReauth=async(args,api,extraOptions)=>{
//       let result=await baseQuery(args,api,extraOptions)
// }
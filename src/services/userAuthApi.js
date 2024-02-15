// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-prana.prana24.in/api/',
  }),

  endpoints: builder => ({
    //Auth End Points//
    registerUser: builder.mutation({
      query: user => {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: formData => {
        console.log('formData', formData);
        return {
          url: 'auth/login',
          method: 'POST',
          body: formData,
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    userLogOut: builder.mutation({
      query: token => {
        return {
          url: 'auth/logout',
          method: 'POST',
          body: {
            token: `${token}`,
          },
        };
      },
    }),
    //Profile End Points
    getLoggedUser: builder.query({
      query: token => {
        return {
          url: 'users/profile',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    editProfile: builder.mutation({
      query: newData => {
        console.warn(newData);
        return {
          url: 'users/profile',
          method: 'PATCH',
          body: {
            first_name: newData.first_name,
            last_name: newData.last_name,
            phone_number: newData.phone_number,
          },
          headers: {
            Authorization: `Bearer ${newData.userLToken}`,
          },
        };
      },
    }),
    //location
    location: builder.query({
      query: latlongdata => {
        console.log('qitems', latlongdata);
        return {
          url: `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latlongdata.latitude},${latlongdata.longitude}&lang=en-US&apiKey=rbLu4IeRUFqNYuSvoknP6OlSdMqTro11FWcE8vpZLsg`,
          method: 'GET',
        };
      },
    }),
    //Medicine End Points//
    categories: builder.query({
      query: token => {
        return {
          url: '/filters?type=MEDICINE_CATEGORY',
          method: 'GET',
        };
      },
    }),
    subcategories: builder.query({
      query: queryItems => {
        return {
          url: `/filters?category_id=${queryItems.id}`,
          method: 'GET',
        };
      },
    }),
    getproductsbyfilterid: builder.query({
      query: queryItems => {
        return {
          url: `/filters/products/${queryItems.id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryItems.token}`,
          },
        };
      },
    }),
    getProduct: builder.query({
      query: id => {
        return {
          url: `/products/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    searchProducts: builder.query({
      query: text => {
        return {
          url: `/products?page=1&limit=16&search=${text}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    wishList: builder.query({
      query: queryItems => {
        return {
          url: `/wishlist`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryItems.token}`,
          },
        };
      },
    }),
    addToWishlist: builder.mutation({
      query: cartData => {
        return {
          url: '/wishlist',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cartData.token}`,
          },
          body: {
            product_id: `${cartData.id}`,
            quantity: `${cartData.quantity}`,
          },
        };
      },
    }),
    deleteWishlistItems: builder.mutation({
      query: remove => {
        console.warn('deleteWishlist', remove);
        return {
          url: `/wishlist/${remove.id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${remove.token}`,
          },
        };
      },
    }),
    //Cart End Points//
    addToCart: builder.mutation({
      query: cartData => {
        return {
          url: '/cart',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cartData.token}`,
          },
          body: {
            quantity: `${cartData.quantity}`,
            product_id: `${cartData.id}`,
          },
        };
      },
    }),
    getAllCartItems: builder.query({
      query: token => {
        return {
          url: '/cart',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteCartItems: builder.mutation({
      query: remove => {
        console.warn('deletcart', remove);
        return {
          url: `/cart/${remove.id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${remove.token}`,
          },
        };
      },
    }),
    //Labcart end Points
    addToLabCart: builder.mutation({
      query: cartData => {
        console.log('cartDataapi', cartData);
        return {
          url: '/cart/labcart',
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${cartData.token}`,
          },
          body: {
            // 'quantity':`${cartData.quantity}`,
            lab_test_id: `${cartData.id}`,
          },
        };
      },
    }),
    getAllLabCartItems: builder.query({
      query: token => {
        return {
          url: '/cart/labcart',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteLabCartItems: builder.mutation({
      query: remove => {
        return {
          url: `/cart/labcart/${remove.id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${remove.token}`,
          },
        };
      },
    }),
    //Brands End Points//
    getBrands: builder.query({
      query: () => '/brands',
    }),
    getBrandItem: builder.query({
      query: queryItems => {
        console.log('query', queryItems);
        return {
          url: `/brands/${queryItems.id}`,
          method: 'GET',
        };
      },
    }),
    //orders End Points
    getOrderHistory: builder.query({
      query: token => {
        return {
          url: '/orders',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getOrderById: builder.query({
      query: queryItems => {
        return {
          url: `/orders/${queryItems.id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryItems.token}`,
          },
        };
      },
    }),
    //Diagnostics End Points//
    getDiagnosticsHealthConcerns: builder.query({
      query: () => {
        return {
          url: '/filters?type=TEST_HEALTH_CONCERN',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getTestOrganCategory: builder.query({
      query: () => {
        return {
          url: '/filters?type=TEST_ORGAN_CATEGORY',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getAllTests: builder.query({
      query: () => {
        return {
          url: '/lab/test',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getTestsByFilter: builder.query({
      query: id => {
        return {
          url: `/lab/test/category/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getAllPackages: builder.query({
      query: () => {
        return {
          url: '/lab/test?is_package=true',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    TestsAndPackagesById: builder.query({
      query: id => {
        return {
          url: `/lab/test?${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    searchTestsAndPackages: builder.query({
      query: text => {
        console.log('searchQuery', text);
        return {
          url: `/lab/test?search=${text}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    //Doctors End Points//
    getConsultationHealthConcerns: builder.query({
      query: () => {
        return {
          url: '/filters?type=CONSULTATION_HEALTH_CONCERN',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getConsultationSpecialization: builder.query({
      query: () => {
        return {
          url: '/filters?type=CONSULTATION_SPECIALIZATION',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        };
      },
    }),
    getDoctorsBySpecialization: builder.query({
      query: queryItems => {
        return {
          url: `/doctor/specialization/${queryItems.id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryItems.token}`,
          },
        };
      },
    }),
    getDoctor: builder.query({
      query: queryItems => {
        return {
          url: `/doctor/${queryItems.uuid}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryItems.token}`,
          },
        };
      },
    }),
    getTimeSlots: builder.query({
      query: queryItems2 => {
        console.warn('slots data', queryItems2);
        return {
          url: `/doctor/timeslot?doctor_id=${queryItems2.id}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryItems2.token}`,
          },
        };
      },
    }),

    // /filters?type=CONSULTATION_SPECIALIZATION
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddToCartMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetLoggedUserQuery,
  useUserLogOutMutation,
  useProductsQuery,
  useSearchProductsQuery,
  useCategoriesQuery,
  useSubcategoriesQuery,
  useGetproductsbyfilteridQuery,
  useGetProductQuery,
  useGetAllCartItemsQuery,
  useDeleteCartItemsMutation,
  useGetBrandsQuery,
  useGetDiagnosticsHealthConcernsQuery,
  useGetConsultationSpecializationQuery,
  useGetConsultationHealthConcernsQuery,
  useGetDoctorsBySpecializationQuery,
  useGetDoctorQuery,
  useGetAllTestsQuery,
  useGetAllPackagesQuery,
  useSearchTestsAndPackagesQuery,
  useTestsAndPackagesByIdQuery,
  useEditProfileMutation,
  useGetOrderHistoryQuery,
  useGetTimeSlotsQuery,
  useAddToLabCartMutation,
  useGetAllLabCartItemsQuery,
  useDeleteLabCartItemsMutation,
  useGetTestOrganCategoryQuery,
  useGetTestsByFilterQuery,
  useGetBrandItemQuery,
  useLocationQuery,
  useWishListQuery,
  useAddToWishlistMutation,
  useDeleteWishlistItemsMutation,
  useGetOrderByIdQuery,
} = userAuthApi;

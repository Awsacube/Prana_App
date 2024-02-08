import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {searchResult: []},
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResult = {
        search: action.payload.result,
      };
    },
  },
});

export const {setSearchResults} = searchSlice.actions;

export default searchSlice;

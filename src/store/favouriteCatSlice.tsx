import { createSlice } from '@reduxjs/toolkit';

interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const favouriteCatSlice = createSlice({
  name: 'favouriteCats',
  initialState: {
    favouriteCats: [] as ICat[],
  },

  reducers: {
    setAddFavorite: (state, action) => {
      if (action.payload) {
        state.favouriteCats = [ ...state.favouriteCats, action.payload];
      }
    },

    setRemoveFavorite: (state, action) => {
      if (action.payload) {
        state.favouriteCats = state.favouriteCats.filter(favouriteCat => favouriteCat.id !== action.payload.id);
      }
    },
  },
});

export const { setAddFavorite, setRemoveFavorite } = favouriteCatSlice.actions;
export default favouriteCatSlice.reducer;

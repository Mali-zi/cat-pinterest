import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCats = createAsyncThunk(
  'cats/fetchCats',
  async (url: string, thunkApi) => {
    const { rejectWithValue, fulfillWithValue } = thunkApi;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return rejectWithValue(response.status);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error: unknown) {
      throw rejectWithValue(error);
    }
  }
);

interface ICats {
  cats: ICat[];
  status: string;
  errors: unknown;
}

interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const catSlice = createSlice({
  name: 'cats',
  initialState: {
    cats: [],
    status: 'idle',
    errors: null,
  } as ICats,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (action.payload) {
          state.cats = [...state.cats, ...action.payload];
        } else {
          state.errors = 'Котики не могут быть загружены.';
        }
      })
      .addCase(fetchCats.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCats.rejected, (state, action) => {
        state.status = 'rejected';
        if (action.payload) {
          state.errors = action.payload;
        } else {
          state.errors = 'Ошибка при загрузке котиков.';
        }
      });
  },
});

export default catSlice.reducer;

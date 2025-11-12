import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('userOrders/fetch', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (err: any) {
    err instanceof Error
      ? err.message
      : typeof err === 'string'
        ? err
        : 'Не удалось загрузить историю заказов';
    return rejectWithValue(err);
  }
});

interface OrderInfo {
  order: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderInfo = {
  order: [],
  isLoading: false,
  error: null
};

export const userOrderSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Не удалось загрузить историю заказов';
      });
  }
});

export default userOrderSlice.reducer;

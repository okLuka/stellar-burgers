import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid,
  createAction
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  void,
  { rejectValue: string; state: { burgerConstructor: ConstructorState } }
>('burgerConstructor/createOrder', async (_, { getState, rejectWithValue }) => {
  const { bun, ingredients } = getState().burgerConstructor;

  if (!bun) return rejectWithValue('Выберите булку');

  const orderData = [bun._id, ...ingredients.map((i) => i._id), bun._id];

  try {
    const res = await orderBurgerApi(orderData);
    return res;
  } catch (err: any) {
    const msg =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
          ? err
          : 'Не удалось создать заказ';
    return rejectWithValue(msg);
  }
});

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: `${ingredient._id}-${Date.now()}-${nanoid()}`
        } as TConstructorIngredient
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex < 0 ||
        toIndex > state.ingredients.length
      ) {
        return;
      }

      const [item] = state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, item);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderModalData = null;
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal
} = constructorSlice.actions;

export default constructorSlice.reducer;

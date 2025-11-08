import { RootState } from './store';

// возвращает все ингредиенты
export const selectIngredients = (state: RootState) => state.ingredients.items;

// возвращает флаг загрузки
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

// возвращает ошибку
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

// селекторы для конструктора
export const selectConstructorBun = (state: RootState) => state.constructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.constructor.ingredients;

export const selectConstructorItems = (state: RootState) => ({
  bun: state.constructor?.bun ?? null,
  ingredients: state.constructor?.ingredients ?? []
});

export const selectOrderRequest = (state: RootState) =>
  state.constructor.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.constructor.orderModalData;

// селекторы для feeds
export const selectOrders = (state: RootState) => state.feeds.orders;

export const selectOrdersTotal = (state: RootState) => state.feeds.total;

export const selectOrdersTotalToday = (state: RootState) =>
  state.feeds.totalToday;

export const selectOrdersLoading = (state: RootState) => state.feeds.isLoading;

export const selectOrdersError = (state: RootState) => state.feeds.error;

// user
export const selectUser = (s: RootState) => s.user.user;
export const selectUserToken = (s: RootState) => s.user.token;
export const selectUserLoading = (s: RootState) => s.user.isLoading;
export const selectUserError = (s: RootState) => s.user.error;

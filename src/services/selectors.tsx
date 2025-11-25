import { RootState } from './store';

export const selectIngredients = (state: RootState) => state.ingredients.items;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const selectConstructorItems = (state: RootState) => ({
  bun: state.burgerConstructor?.bun ?? null,
  ingredients: state.burgerConstructor?.ingredients ?? []
});

export const selectOrderRequest = (state: RootState) =>
  state.burgerConstructor.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.burgerConstructor.orderModalData;

export const selectOrders = (state: RootState) => state.feeds.orders;

export const selectOrdersTotal = (state: RootState) => state.feeds.total;

export const selectOrdersTotalToday = (state: RootState) =>
  state.feeds.totalToday;

export const selectOrdersLoading = (state: RootState) => state.feeds.isLoading;

export const selectOrdersError = (state: RootState) => state.feeds.error;

export const selectUser = (s: RootState) => s.user.user;
export const selectUserToken = (s: RootState) => s.user.token;
export const selectUserLoading = (s: RootState) => s.user.isLoading;
export const selectUserError = (s: RootState) => s.user.error;

export const selectUserOrders = (s: RootState) => s.userOrder.order;
export const selectUserOrdersLoading = (s: RootState) => s.userOrder.isLoading;
export const selectUserOrdersError = (s: RootState) => s.userOrder.error;

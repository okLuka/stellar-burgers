import { RootReducer } from './root-rudecer';
import { ingredientsSlice } from './slices/ingredients-slice';
import { constructorSlice } from './slices/constructor-slice';
import { userSlice } from './slices/user-slice';
import { userOrderSlice } from './slices/user-order-slice';
import { feedsSlice } from './slices/feed-slice';

const getInitialState = () => ({
  ingredients: ingredientsSlice.getInitialState(),
  feeds: feedsSlice.getInitialState(),
  user: userSlice.getInitialState(),
  burgerConstructor: constructorSlice.getInitialState(),
  userOrder: userOrderSlice.getInitialState()
});

describe('RootReducer initialization', () => {
  test('возвращает корректное начальное состояние', () => {
    const state = RootReducer(undefined, { type: '@@INIT' });
    const expected = getInitialState();

    expect(state).toEqual(expected);

  });

  test('каждый слайс инициализируется своим initialState', () => {
    const state = RootReducer(undefined, { type: '@@INIT' });

    expect(state.ingredients).toEqual(ingredientsSlice.getInitialState());
    expect(state.feeds).toEqual(feedsSlice.getInitialState());
    expect(state.user).toEqual(userSlice.getInitialState());
    expect(state.burgerConstructor).toEqual(
      constructorSlice.getInitialState()
    );
    expect(state.userOrder).toEqual(userOrderSlice.getInitialState());
  });
});

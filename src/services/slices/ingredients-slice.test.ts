import reducer, { fetchIngredients } from './ingredients-slice';
import type { IngredientsState } from './ingredients-slice';
import type { TIngredient } from '../../utils/types';

const getInitialState = (): IngredientsState =>
  reducer(undefined, { type: '@@INIT' }) as IngredientsState;

const baseIngredient: TIngredient = {
  _id: 'ing-1',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://example.com/img.png',
  image_mobile: 'https://example.com/img-mobile.png',
  image_large: 'https://example.com/img-large.png'
};


describe('ingredientsSlice reducer', () => {
  test('при fetchIngredients.pending isLoading = true, error = null', () => {
    const initialState = getInitialState();

    const nextState = reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
    expect(nextState.items).toEqual(initialState.items);
  });

  test('при fetchIngredients.fulfilled записывает ингредиенты в items и isLoading = false', () => {
    const initialState: IngredientsState = {
      ...getInitialState(),
      isLoading: true,
      error: 'предыдущая ошибка'
    };

    const payload: TIngredient[] = [baseIngredient];

    const action = fetchIngredients.fulfilled(payload, '', undefined);
    const nextState = reducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.items).toEqual(payload);
  });

  test('при fetchIngredients.rejected пишет ошибку в error и isLoading = false', () => {
    const initialState: IngredientsState = {
      ...getInitialState(),
      isLoading: true,
      error: null
    };

    const errorMessage = 'Не удалось загрузить ингредиенты';

    const action = fetchIngredients.rejected(null, '', undefined, errorMessage);

    const nextState = reducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.items).toEqual(initialState.items);
  });
});

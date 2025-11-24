import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructor-slice';
import type {
  TIngredient,
  TConstructorIngredient
} from '../../utils/types';


const getInitialState = () =>
  reducer(undefined, { type: '@@INIT' }) as ReturnType<typeof reducer>;


const baseIngredient: TIngredient = {
  _id: 'test-id-1',
  name: 'Тестовый ингредиент',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png'
};

afterEach(() => {
  localStorage.clear();

  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
  });
});

describe('burgerConstructor reducer', () => {
  test('обрабатывает добавление ингредиента (addIngredient)', () => {
    const state = getInitialState();

    const nextState = reducer(state, addIngredient(baseIngredient));


    expect(nextState.ingredients).toHaveLength(1);

    const added = nextState.ingredients[0];


    expect(added.id).toBeDefined();
    expect(added._id).toBe(baseIngredient._id);
    expect(added.name).toBe(baseIngredient.name);
  });

  test('обрабатывает удаление ингредиента (removeIngredient)', () => {

    const ingredient1: TConstructorIngredient = {
      ...baseIngredient,
      id: 'local-1'
    };
    const ingredient2: TConstructorIngredient = {
      ...baseIngredient,
      _id: 'test-id-2',
      name: 'Другой ингредиент',
      id: 'local-2'
    };

    const state = {
      ...getInitialState(),
      ingredients: [ingredient1, ingredient2]
    };

    const nextState = reducer(state, removeIngredient('local-1'));


    expect(nextState.ingredients).toHaveLength(1);
    expect(nextState.ingredients[0].id).toBe('local-2');
    expect(nextState.ingredients[0].name).toBe('Другой ингредиент');
  });

  test('обрабатывает изменение порядка ингредиентов (moveIngredient)', () => {
    const ingredient1: TConstructorIngredient = {
      ...baseIngredient,
      id: 'id-1',
      name: 'Ингредиент 1'
    };
    const ingredient2: TConstructorIngredient = {
      ...baseIngredient,
      id: 'id-2',
      name: 'Ингредиент 2'
    };
    const ingredient3: TConstructorIngredient = {
      ...baseIngredient,
      id: 'id-3',
      name: 'Ингредиент 3'
    };

    const state = {
      ...getInitialState(),
      ingredients: [ingredient1, ingredient2, ingredient3]
    };


    const nextState = reducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    const idsOrder = nextState.ingredients.map((i) => i.id);


    expect(idsOrder).toEqual(['id-2', 'id-3', 'id-1']);
  });
});

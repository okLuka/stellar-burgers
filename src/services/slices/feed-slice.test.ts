import reducer, { fetchFeeds } from './feed-slice';
import type { FeedState } from './feed-slice';
import type { TOrdersData } from '../../utils/types';

const getInitialState = (): FeedState =>
  reducer(undefined, { type: '@@INIT' }) as FeedState;


describe('feedsSlice reducer', () => {
  test('при fetchFeeds.pending isLoading становится true, error сбрасывается', () => {
    const initialState = getInitialState();

    const nextState = reducer(initialState, fetchFeeds.pending('', undefined));

    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
    expect(nextState.orders).toEqual(initialState.orders);
    expect(nextState.total).toBe(initialState.total);
    expect(nextState.totalToday).toBe(initialState.totalToday);
  });

  test('при fetchFeeds.fulfilled данные записываются в стор, isLoading = false', () => {
    const initialState = {
      ...getInitialState(),
      isLoading: true,
      error: 'какая-то ошибка'
    };

    const payload: TOrdersData = {
      orders: [
        {
          _id: 'order-1',
          number: 123,
          name: 'Тестовый заказ',
          status: 'done',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          ingredients: ['ing-1', 'ing-2']
        }
      ],
      total: 10,
      totalToday: 2
    };

    const action = fetchFeeds.fulfilled(payload, '', undefined);
    const nextState = reducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();

    expect(nextState.orders).toEqual(payload.orders);
    expect(nextState.total).toBe(payload.total);
    expect(nextState.totalToday).toBe(payload.totalToday);
  });

  test('при fetchFeeds.rejected ошибка пишется в error, isLoading = false', () => {
    const initialState = {
      ...getInitialState(),
      isLoading: true,
      error: null
    };

    const errorMessage = 'Не удалось загрузить заказы';

    const action = fetchFeeds.rejected(null, '', undefined, errorMessage);

    const nextState = reducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.orders).toEqual(initialState.orders);
    expect(nextState.total).toBe(initialState.total);
    expect(nextState.totalToday).toBe(initialState.totalToday);
  });
});

import reducer, { fetchUserOrders } from './user-order-slice';
import type { TOrder } from '../../utils/types';

const getInitialState = () =>
  reducer(undefined, { type: '@@INIT' });

const orderMock: TOrder = {
  _id: 'order-1',
  number: 777,
  name: 'Тестовый заказ',
  status: 'done',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  ingredients: ['ing-1', 'ing-2']
};

describe('userOrderSlice reducer', () => {
  test('pending → isLoading = true, error = null', () => {
    const initial = getInitialState();

    const next = reducer(initial, fetchUserOrders.pending('', undefined));

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
    expect(next.order).toEqual([]);
  });

  test('fulfilled → записывает заказы в state.order, isLoading = false', () => {
    const initial = {
      ...getInitialState(),
      isLoading: true,
      error: 'старое сообщение'
    };

    const payload = [orderMock];

    const next = reducer(
      initial,
      fetchUserOrders.fulfilled(payload, '', undefined)
    );

    expect(next.isLoading).toBe(false);
    expect(next.order).toEqual(payload);
    expect(next.error).toBe('старое сообщение');
  });

  test('rejected → error = payload, isLoading = false', () => {
    const initial = {
      ...getInitialState(),
      isLoading: true
    };

    const errorMsg = 'Ошибка загрузки';

    const next = reducer(
      initial,
      fetchUserOrders.rejected(
        null,     
        '',       
        undefined,
        errorMsg  
      )
    );

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe(errorMsg);
    expect(next.order).toEqual([]);
  });
});

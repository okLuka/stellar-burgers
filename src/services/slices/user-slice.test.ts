import reducer, {
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  logoutUser,
  clearUserError
} from './user-slice';

import type { TUser } from '../../utils/types';

const getInitialState = () =>
  reducer(undefined, { type: '@@INIT' });

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice reducer', () => {

  // LOGIN


  test('loginUser.pending → isLoading = true, error = null', () => {
    const initial = getInitialState();

    const next = reducer(initial, loginUser.pending('', { email: '', password: '' }));

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test('loginUser.fulfilled → пишет user и token, выключает isLoading', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const payload = { user: mockUser, token: 'token123' };
    const next = reducer(initial, loginUser.fulfilled(payload, '', { email: '', password: '' }));

    expect(next.isLoading).toBe(false);
    expect(next.error).toBeNull();
    expect(next.user).toEqual(mockUser);
    expect(next.token).toBe('token123');
  });

  test('loginUser.rejected → пишет ошибку', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const next = reducer(initial, loginUser.rejected(null, '', { email: '', password: '' }, 'Ошибка входа'));

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('Ошибка входа');
    expect(next.user).toBeNull();
  });

  // REGISTER


  test('registerUser.pending → isLoading = true, error = null', () => {
    const next = reducer(getInitialState(), registerUser.pending('', { email: '', password: '', name: '' }));

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test('registerUser.fulfilled → пишет user и token', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const payload = { user: mockUser, token: 'reg-token' };
    const next = reducer(initial, registerUser.fulfilled(payload, '', { email: '', password: '', name: '' }));

    expect(next.isLoading).toBe(false);
    expect(next.user).toEqual(mockUser);
    expect(next.token).toBe('reg-token');
    expect(next.error).toBeNull();
  });

  test('registerUser.rejected → пишет ошибку', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const next = reducer(initial, registerUser.rejected(null, '', { email: '', password: '', name: '' }, 'Ошибка рег'));

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('Ошибка рег');
  });

  // FETCH USER


  test('fetchUser.pending → isLoading = true, error = null', () => {
    const next = reducer(getInitialState(), fetchUser.pending('', undefined));

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test('fetchUser.fulfilled → пишет user', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const next = reducer(initial, fetchUser.fulfilled(mockUser, '', undefined));

    expect(next.isLoading).toBe(false);
    expect(next.user).toEqual(mockUser);
    expect(next.error).toBeNull();
  });

  test('fetchUser.rejected → пишет ошибку', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const next = reducer(initial, fetchUser.rejected(null, '', undefined, 'Ошибка получения'));

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('Ошибка получения');
  });

  // UPDATE USER


  test('updateUser.pending → isLoading = true, error = null', () => {
    const next = reducer(getInitialState(), updateUser.pending('', {}));

    expect(next.isLoading).toBe(true);
    expect(next.error).toBeNull();
  });

  test('updateUser.fulfilled → обновляет user', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const updatedUser = { email: 'new@example.com', name: 'New Name' };
    const next = reducer(initial, updateUser.fulfilled(updatedUser, '', {}));

    expect(next.isLoading).toBe(false);
    expect(next.user).toEqual(updatedUser);
    expect(next.error).toBeNull();
  });

  test('updateUser.rejected → пишет ошибку', () => {
    const initial = { ...getInitialState(), isLoading: true };

    const next = reducer(initial, updateUser.rejected(null, '', {}, 'Ошибка обновления'));

    expect(next.isLoading).toBe(false);
    expect(next.error).toBe('Ошибка обновления');
  });

  // LOGOUT


  test('logoutUser.fulfilled → user=null, token=null, error=null', () => {
    const initial = {
      user: mockUser,
      token: 'token123',
      isLoading: false,
      error: 'есть ошибка'
    };

    const next = reducer(initial, logoutUser.fulfilled(undefined, '', undefined));

    expect(next.user).toBeNull();
    expect(next.token).toBeNull();
    expect(next.error).toBeNull();
  });

  test('logoutUser.rejected → пишет ошибку', () => {
    const initial = {
      ...getInitialState(),
      error: null
    };

    const next = reducer(initial, logoutUser.rejected(null, '', undefined, 'Не удалось выйти'));

    expect(next.error).toBe('Не удалось выйти');
  });

  test('clearUserError → error=null', () => {
    const initial = { ...getInitialState(), error: 'Ошибка' };

    const next = reducer(initial, clearUserError());

    expect(next.error).toBeNull();
  });
});

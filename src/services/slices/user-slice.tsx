import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../utils/burger-api';
import type { TUser } from '../../utils/types';
import { setCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk<
  { user: TUser; token: string },
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await loginUserApi(credentials);
    if (!res?.success) return rejectWithValue('Не удалось войти');
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return { user: res.user, token: res.accessToken };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Ошибка при входе';

    return rejectWithValue(msg);
  }
});

export const registerUser = createAsyncThunk<
  { user: TUser; token: string },
  { email: string; password: string; name: string },
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(data);
    if (!res?.success) return rejectWithValue('Не удалось зарегистрироваться');
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return { user: res.user, token: res.accessToken };
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'Ошибка при регистрации';

    return rejectWithValue(msg);
  }
});

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      if (!res?.success)
        return rejectWithValue('Не удалось получить пользователя');
      return res.user;
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : 'Ошибка получения пользователя';

      return rejectWithValue(msg);
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<{ email: string; name: string; password: string }>,
  { rejectValue: string }
>('user/update', async (userPatch, { rejectWithValue }) => {
  try {
    const res = await updateUserApi(userPatch);
    if (!res?.success) return rejectWithValue('Не удалось обновить профиль');
    return res.user;
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'Ошибка получения пользователя';

    return rejectWithValue(msg);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const res = await logoutApi();
      if (!res?.success) return rejectWithValue('Не удалось выйти');
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '', { expires: -1, path: '/' });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Ошибка при выходе';

      return rejectWithValue(msg);
    }
  }
);

type UserState = {
  user: TUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (s) => {
      s.error = null;
    }
  },
  extraReducers: (b) => {
    b.addCase(loginUser.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    });
    b.addCase(loginUser.fulfilled, (s, a) => {
      s.isLoading = false;
      s.error = null;
      s.user = a.payload.user;
      s.token = a.payload.token;
    });
    b.addCase(loginUser.rejected, (s, a) => {
      s.isLoading = false;
      s.error = a.payload ?? 'Ошибка при входе';
    });

    b.addCase(registerUser.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    });
    b.addCase(registerUser.fulfilled, (s, a) => {
      s.isLoading = false;
      s.error = null;
      s.user = a.payload.user;
      s.token = a.payload.token;
    });
    b.addCase(registerUser.rejected, (s, a) => {
      s.isLoading = false;
      s.error = a.payload ?? 'Ошибка при регистрации';
    });

    b.addCase(fetchUser.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    });
    b.addCase(fetchUser.fulfilled, (s, a) => {
      s.isLoading = false;
      s.error = null;
      s.user = a.payload;
    });
    b.addCase(fetchUser.rejected, (s, a) => {
      s.isLoading = false;
      s.error = a.payload ?? 'Ошибка загрузки профиля';
    });

    b.addCase(updateUser.pending, (s) => {
      s.isLoading = true;
      s.error = null;
    });
    b.addCase(updateUser.fulfilled, (s, a) => {
      s.isLoading = false;
      s.error = null;
      s.user = a.payload;
    });
    b.addCase(updateUser.rejected, (s, a) => {
      s.isLoading = false;
      s.error = a.payload ?? 'Ошибка обновления профиля';
    });

    b.addCase(logoutUser.fulfilled, (s) => {
      s.user = null;
      s.token = null;
      s.error = null;
    });
    b.addCase(logoutUser.rejected, (s, a) => {
      s.error = a.payload ?? 'Ошибка при выходе';
    });
  }
});

export default userSlice.reducer;
export const { clearUserError } = userSlice.actions;

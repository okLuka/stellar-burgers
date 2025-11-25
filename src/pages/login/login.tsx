import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate, Location } from 'react-router-dom';
import { loginUser, clearUserError } from '../../services/slices/user-slice';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, isLoading } = useSelector((s) => s.user);
  const state = location.state as LocationState | null;
  const from = state?.from?.pathname || '/';

  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      console.log('LOGIN FAIL:', err);
    }
  };

  return (
    <LoginUI
      errorText={!isLoading ? error || '' : ''}
      email={email}
      setEmail={(v) => {
        if (error) dispatch(clearUserError());
        setEmail(v);
      }}
      password={password}
      setPassword={(v) => {
        if (error) dispatch(clearUserError());
        setPassword(v);
      }}
      handleSubmit={handleSubmit}
    />
  );
};

import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../services/store';

type Props = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

type ProtectedRouteState = {
  from?: {
    pathname?: string;
  };
};

export const ProtectedRoute = ({ children, onlyUnAuth }: Props) => {
  const { user, token, isLoading } = useSelector((s) => s.user);
  const location = useLocation();
  const cookieToken = getCookie('accessToken');
  const isAuth = Boolean(cookieToken || token || user);

  if (!onlyUnAuth && isLoading) {
    return null;
  }

  if (onlyUnAuth && isAuth) {
    const state = location.state as ProtectedRouteState | null;
    const from = state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

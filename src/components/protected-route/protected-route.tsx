import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';

type Props = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ children, onlyUnAuth }: Props) => {
  const isAuth = Boolean(getCookie('accessToken'));
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

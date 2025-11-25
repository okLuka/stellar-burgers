import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user-slice';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {}
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

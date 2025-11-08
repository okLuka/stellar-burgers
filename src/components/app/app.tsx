import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ProtectedRoute } from '../protected-route/protected-route';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const FeedOrderModal = () => {
  const navigate = useNavigate();
  return (
    <Modal title='Информация о заказе' onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};

const IngredientDetailsModal = () => {
  const navigate = useNavigate();
  return (
    <Modal title='Ингредиенты' onClose={() => navigate(-1)}>
      <IngredientDetails />
    </Modal>
  );
};

const OrderInfoModal = () => {
  const navigate = useNavigate();
  return (
    <Modal title='Заказ' onClose={() => navigate(-1)}>
      <OrderInfo />
    </Modal>
  );
};

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/feed' element={<Feed />} />
      <Route path='/' element={<ConstructorPage />} />
      <Route path='*' element={<NotFound404 />} />
      <Route path='/feed/:number' element={<FeedOrderModal />} />
      <Route path='/ingredients/:id' element={<IngredientDetailsModal />} />
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <OrderInfoModal />
          </ProtectedRoute>
        }
      />
      <Route
        path='/login'
        element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path='/register'
        element={
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path='/forgot-password'
        element={
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/reset-password'
        element={
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/profile/orders'
        element={
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>
);

export default App;

import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { getCookie } from '../../utils/cookie';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} from '@selectors';
import {
  createOrder,
  closeOrderModal as closeOrderModalAction
} from '../../services/slices/constructor-slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const { user, token } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const isAuth = Boolean(getCookie('accessToken') || token || user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) return;
    dispatch(createOrder());
  };

  const closeOrderModal = () => {
    dispatch(closeOrderModalAction());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients || []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

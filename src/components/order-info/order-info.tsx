import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';

import { selectIngredients, selectIngredientsLoading } from '@selectors';
import { fetchIngredients } from '../../services/slices/ingredients-slice';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const ingredientsLoading = useSelector(selectIngredientsLoading);

  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(true); // загрузка заказа
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!number) {
      setError('Неверный номер заказа');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getOrderByNumberApi(Number(number));
        if (controller.signal.aborted) return;

        if (res.success && res.orders.length > 0) {
          setOrderData(res.orders[0]);
        } else {
          setError('Заказ не найден');
        }
      } catch (e) {
        if (!controller.signal.aborted) {
          console.error('Failed to fetch order:', e);
          setError('Ошибка загрузки заказа');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce<TIngredientsWithCount>(
      (acc, id) => {
        if (!acc[id]) {
          const ing = ingredients.find((x) => x._id === id);
          if (ing) acc[id] = { ...ing, count: 1 };
        } else {
          acc[id].count += 1;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (loading || ingredientsLoading) return <Preloader />;
  if (error) return <div className='text text_type_main-default'>{error}</div>;
  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};

import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { selectIngredients } from '@selectors';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const ingredients = useSelector(selectIngredients);
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (number) {
      setLoading(true);
      setError(null);
      getOrderByNumberApi(Number(number))
        .then((response) => {
          if (response.success && response.orders.length > 0) {
            setOrderData(response.orders[0]);
          } else {
            setError('Заказ не найден');
          }
        })
        .catch((error) => {
          console.error('Failed to fetch order:', error);
          setError('Ошибка загрузки заказа');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className='text text_type_main-default'>{error}</div>;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

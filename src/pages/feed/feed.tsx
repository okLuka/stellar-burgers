import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectOrders, selectOrdersLoading } from '@selectors';
import { fetchFeeds } from '../../services/slices/feed-slice';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};

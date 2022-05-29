import React from 'react';
import {Item, ItemStatusType} from '../../../../models/Item';
import StatusView from '../../../../components/views/StatusView';
import {StatusSelect} from '../../../../components/inputs/StatusSelect';
import {useAppDispatch} from '../../../../store/store';
import GroupThunks from '../../../../store/group/groupThunks';
import {useDelayedState} from '../../../../shared/hooks/useDelayedState';

type GroupViewItemStatusProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemStatus = ({item, canEdit}: GroupViewItemStatusProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useDelayedState(false);

  const updateStatus = (status: ItemStatusType): void => {
    setLoading(true);
    dispatch(GroupThunks.updateItemStatus({item, status}))
      .unwrap()
      .finally(() => setLoading(false));
  };

  const statusInput = <StatusSelect statusType={item.status} setStatusType={updateStatus} loading={loading} />;
  const statusView = <StatusView statusType={item.status} size="sm" />;

  return canEdit ? statusInput : statusView;
};

export default GroupViewItemStatus;

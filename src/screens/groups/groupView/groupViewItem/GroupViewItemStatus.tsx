import React, {useState} from 'react';
import {Item, ItemStatusType} from '../../../../models/Item';
import StatusView from '../../../../components/views/StatusView';
import {useSnackContext} from '../../../../shared/contexts/SnackContext';
import {useItemListContext} from '../../../../shared/contexts/listContexts/itemListContext';
import {useArchivedItemListContext} from '../../../../shared/contexts/listContexts/archivedItemListContext';
import ItemService from '../../../../services/ItemService';
import {StatusSelect} from '../../../../components/inputs/StatusSelect';

type GroupViewItemStatusProps = {
  item: Item;
  canEdit: boolean;
};

const GroupViewItemStatus = ({item, canEdit}: GroupViewItemStatusProps) => {
  const {handleResponse} = useSnackContext();
  const {updateItem: updateActive} = useItemListContext();
  const {updateItem: updateArchived} = useArchivedItemListContext();
  const [loading, setLoading] = useState<boolean>(false);

  const updateItem = item.archived ? updateArchived : updateActive;

  const updateStatus = (status: ItemStatusType): void => {
    setLoading(true);
    ItemService.updateItemStatus(item.id, status)
      .then(() => {
        const updatedItem = {...item, status};
        updateItem(updatedItem);
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const statusInput = <StatusSelect statusType={item.status} setStatusType={updateStatus} loading={loading} />;
  const statusView = <StatusView statusType={item.status} size="sm" />;

  return canEdit ? statusInput : statusView;
};

export default GroupViewItemStatus;

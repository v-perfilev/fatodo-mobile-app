import React, {useState} from 'react';
import {Group} from '../../../models/Group';
import Checkbox from '../../../components/controls/Checkbox';
import {Item} from '../../../models/Item';
import {ItemActions} from '../../../store/item/itemActions';
import {useAppDispatch} from '../../../store/store';

type ItemDoneCheckboxProps = {
  group: Group;
  item: Item;
  canEdit?: boolean;
};

const ItemDoneCheckbox = ({group, item, canEdit}: ItemDoneCheckboxProps) => {
  const dispatch = useAppDispatch();
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const toggleStatus = (): void => {
    setStatusLoading(true);
    dispatch(ItemActions.updateItemStatusThunk(item))
      .unwrap()
      .finally(() => setStatusLoading(false));
  };

  const handlePress = canEdit ? toggleStatus : undefined;

  return (
    <Checkbox
      checked={item.done}
      colorScheme={group.color}
      size={30}
      loading={statusLoading}
      canNotEdit={!canEdit}
      onPress={handlePress}
    />
  );
};

export default ItemDoneCheckbox;

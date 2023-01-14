import React from 'react';
import {Item} from '../../../models/Item';
import {Text} from 'native-base';
import DateView from '../../../components/views/DateView';

type ItemDateProps = {
  item: Item;
};

const ItemDate = ({item}: ItemDateProps) => {
  const date = new Date(item.createdAt);

  return (
    <Text fontSize="xs" color="gray.400">
      <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
    </Text>
  );
};

export default ItemDate;

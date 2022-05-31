import React, {ReactElement, useMemo} from 'react';
import {Item} from '../../../../models/Item';
import GroupListCardSkeleton from '../skeletons/GroupListCardSkeleton';
import GroupListCardInfo from './GroupListCardInfo';
import GroupListCardItem from '../groupListCardItem/GroupListCardItem';
import {Group} from '../../../../models/Group';
import FVStack from '../../../../components/boxes/FVStack';

type GroupListCardContentProps = {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent = ({group, items, count, loading}: GroupListCardContentProps) => {
  const skeleton = useMemo<ReactElement>(() => <GroupListCardSkeleton />, []);

  const itemsView = (
    <FVStack mt="2" space="2">
      {items.map((item) => (
        <GroupListCardItem group={group} item={item} key={item.id} />
      ))}
    </FVStack>
  );

  const groupInfo = <GroupListCardInfo group={group} items={items} count={count} />;

  return (
    <FVStack mx="2">
      {loading && skeleton}
      {!loading && count > 0 && itemsView}
      {!loading && groupInfo}
    </FVStack>
  );
};

export default GroupListCardContent;

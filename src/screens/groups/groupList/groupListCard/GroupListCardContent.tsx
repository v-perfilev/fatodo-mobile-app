import React from 'react';
import {Item} from '../../../../models/Item';
import GroupListCardSkeleton from '../../components/skeletons/GroupListCardSkeleton';
import GroupListCardInfo from './GroupListCardInfo';
import GroupItem from '../../components/groupItem/GroupItem';
import {Group} from '../../../../models/Group';
import FVStack from '../../../../components/boxes/FVStack';
import {Box} from 'native-base';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import Separator from '../../../../components/layouts/Separator';

type GroupListCardContentProps = {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent = ({group, items, count, loading}: GroupListCardContentProps) => {
  const account = useAppSelector(AuthSelectors.account);

  const skeleton = <GroupListCardSkeleton />;

  const canEdit = group && GroupUtils.canEdit(account, group);

  const groupInfo = <GroupListCardInfo group={group} items={items} count={count} />;

  const itemsView = (
    <>
      {items.slice(0, 5).map((item, index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <GroupItem item={item} group={group} canEdit={canEdit} />
        </Box>
      ))}
    </>
  );

  return (
    <FVStack>
      {loading && skeleton}
      {!loading && count > 0 && itemsView}
      {!loading && groupInfo}
    </FVStack>
  );
};

export default GroupListCardContent;

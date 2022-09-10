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

  const canEdit = group && GroupUtils.canEdit(account, group);

  return (
    <FVStack>
      {loading && <GroupListCardSkeleton />}
      {!loading &&
        items.slice(0, 5).map((item, index) => (
          <Box key={index}>
            {index !== 0 && <Separator />}
            <GroupItem item={item} group={group} canEdit={canEdit} />
          </Box>
        ))}
      {!loading && <GroupListCardInfo group={group} items={items} count={count} />}
    </FVStack>
  );
};

export default GroupListCardContent;

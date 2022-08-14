import React, {Dispatch, SetStateAction} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {GroupThunks} from '../../../store/group/groupActions';
import GroupViewItems from './groupViewItems/GroupViewItems';

type GroupViewActiveProps = {
  loading: boolean;
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewActive = ({loading, showArchived, setShowArchived}: GroupViewActiveProps) => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const activeItems = useAppSelector(GroupSelectors.activeItems);

  const load = async (): Promise<void> => {
    await dispatch(GroupThunks.fetchActiveItems({groupId: group.id, offset: activeItems.length}));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(GroupThunks.refreshActiveItems(group.id));
  };

  return (
    <GroupViewItems
      items={activeItems}
      load={load}
      refresh={refresh}
      loading={loading}
      showArchived={showArchived}
      setShowArchived={setShowArchived}
    />
  );
};

export default GroupViewActive;

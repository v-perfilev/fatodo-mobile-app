import React, {Dispatch, SetStateAction} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupSelectors from '../../../store/group/groupSelectors';
import {GroupThunks} from '../../../store/group/groupActions';
import GroupViewItems from './groupViewItems/GroupViewItems';

type GroupViewArchivedProps = {
  loading: boolean;
  showArchived: boolean;
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewArchived = ({loading, showArchived, setShowArchived}: GroupViewArchivedProps) => {
  const dispatch = useAppDispatch();
  const group = useAppSelector(GroupSelectors.group);
  const archivedItems = useAppSelector(GroupSelectors.archivedItems);

  const load = async (): Promise<void> => {
    await dispatch(GroupThunks.fetchArchivedItems({groupId: group.id, offset: archivedItems.length}));
  };

  const refresh = async (): Promise<void> => {
    await dispatch(GroupThunks.refreshArchivedItems(group.id));
  };

  return (
    <GroupViewItems
      items={archivedItems}
      load={load}
      refresh={refresh}
      loading={loading}
      showArchived={showArchived}
      setShowArchived={setShowArchived}
    />
  );
};

export default GroupViewArchived;

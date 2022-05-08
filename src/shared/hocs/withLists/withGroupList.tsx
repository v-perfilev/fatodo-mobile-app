import * as React from 'react';
import {ComponentType, useState} from 'react';
import {useSnackContext} from '../../contexts/SnackContext';
import {Group} from '../../../models/Group';
import ItemService from '../../../services/ItemService';
import {GroupListContext} from '../../contexts/listContexts/groupListContext';

const withGroupList = (Component: ComponentType) => (props: any) => {
  const {handleResponse} = useSnackContext();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteGroup = (groupId: string): void => {
    setGroups((prevState) => prevState.filter((g) => g.id !== groupId));
  };

  const load = (): void => {
    setLoading(true);
    ItemService.getAllGroups()
      .then((response) => {
        setGroups(response.data);
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {groups, setGroups, deleteGroup, load, loading};

  return (
    <GroupListContext.Provider value={context}>
      <Component {...props} />
    </GroupListContext.Provider>
  );
};

export default withGroupList;

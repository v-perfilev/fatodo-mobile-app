import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/SnackContext';
import {Group} from '../../../models/Group';
import ItemService from '../../../services/ItemService';
import {GroupListContext} from '../../contexts/listContexts/groupListContext';

const withGroupList =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    const {handleResponse} = useSnackContext();
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    const context = {groups, setGroups, load, loading};

    return (
      <GroupListContext.Provider value={context}>
        <Component {...props} />
      </GroupListContext.Provider>
    );
  };

export default withGroupList;

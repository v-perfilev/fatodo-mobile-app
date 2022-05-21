import * as React from 'react';
import {ComponentType, useMemo, useState} from 'react';
import {User} from '../../../models/User';
import UserService from '../../../services/UserService';
import {ArrayUtils} from '../../utils/ArrayUtils';
import {UserListContext} from '../../contexts/listContexts/userListContext';

const withUserList = (Component: ComponentType) => (props: any) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const loadUsersByIds = (ids: string[]): void => {
    setLoadingIds((prevState) => [...prevState, ...ids]);
    UserService.getAllByIds(ids)
      .then((response) => {
        setUsers((users) => {
          const newUsers = [...response.data, ...users];
          const uniqueUsers = newUsers.filter(ArrayUtils.uniqueByIdFilter);
          return [...uniqueUsers];
        });
      })
      .finally(() => {
        setLoadingIds((prevState) => {
          return prevState.filter((id) => !ids.includes(id));
        });
      });
  };

  const addAbsentUserIds = (ids: string[]): void => {
    const existingIds = users.map((user) => user.id);
    const notAllowedIds = [...existingIds, ...loadingIds];
    const idsToLoad = ids.filter(ArrayUtils.uniqueFilter).filter((id) => !notAllowedIds.includes(id));
    if (idsToLoad.length > 0) {
      loadUsersByIds(idsToLoad);
    }
  };

  const addAbsentUsers = (users: User[]): void => {
    setUsers((previousState) => {
      const newUsers = [...users, ...previousState];
      const uniqueUsers = newUsers.filter(ArrayUtils.uniqueByIdFilter);
      return [...uniqueUsers];
    });
  };

  const loading = useMemo<boolean>(() => loadingIds.length > 0, [loadingIds]);

  const context = {users, handleUserIds: addAbsentUserIds, handleUsers: addAbsentUsers, loading};

  return (
    <UserListContext.Provider value={context}>
      <Component {...props} />
    </UserListContext.Provider>
  );
};

export default withUserList;

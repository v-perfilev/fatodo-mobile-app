import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import {useUserListContext} from '../../../shared/contexts/listContexts/userListContext';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import {User} from '../../../models/User';
import UserService from '../../../services/UserService';
import {Center, Text, VStack} from 'native-base';
import withUserList from '../../../shared/hocs/withLists/withUserList';
import {ArrayUtils} from '../../../shared/utils/ArrayUtils';
import ClearableTextInput from '../ClearableTextInput';
import UsersSelectItem from './UsersSelectItem';

type Props = {
  allowedIds: string[];
  ignoredIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelect: FC<Props> = ({allowedIds, ignoredIds, setUserIds}: Props) => {
  const {users, handleUserIds, handleUsers} = useUserListContext();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [filter, setFilter] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [usersToShow, setUsersToShow] = useState<User[]>([]);

  const isSelected = (user: User): boolean => selectedIds.includes(user.id);

  const toggleSelected = (user: User) => (): void => {
    setSelectedIds((prevState) => {
      if (!prevState.includes(user.id)) {
        return [...prevState, user.id];
      } else {
        prevState = ArrayUtils.deleteItem(prevState, user.id);
        return [...prevState];
      }
    });
  };

  const handleUsersToShow = (): void => {
    const filterFunc = (user: User): boolean => user.username.toLowerCase().startsWith(filter.toLowerCase());
    const filterInFunc =
      (ids: string[]) =>
      (user: User): boolean =>
        ids.includes(user.id);
    const filterNotInFunc =
      (ids: string[]) =>
      (user: User): boolean =>
        !ids.includes(user.id);

    let updatedUsersToShow = filter.length > 0 ? users.filter(filterFunc) : users;
    updatedUsersToShow = updatedUsersToShow
      .filter(filterInFunc(allowedIds))
      .filter(filterNotInFunc(selectedIds))
      .filter(filterNotInFunc(ignoredIds));

    const selectedUsers = users.filter(filterInFunc(selectedIds));
    updatedUsersToShow.push(...selectedUsers);

    setUsersToShow(updatedUsersToShow);
  };

  const handleFilterChange = (text: string): void => {
    setFilter(text);
  };

  const loadUserFromFilter = (): void => {
    if (filter.length > 0) {
      UserService.getAllByUsernamePart(filter)
        .then((response) => {
          const users = response.data;
          handleUsers(users);
        })
        .catch(({response}) => {
          handleResponse(response);
        });
    }
  };

  useEffect(() => {
    handleUserIds(allowedIds);
  }, [allowedIds]);

  useEffect(() => {
    loadUserFromFilter();
  }, [filter]);

  useEffect(() => {
    setUserIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    handleUsersToShow();
  }, [users, selectedIds, ignoredIds, filter]);

  return (
    <VStack>
      <ClearableTextInput placeholder={t('inputs.search')} onChangeText={handleFilterChange} />
      {usersToShow.length > 0 && (
        <VStack mt="3" mb="1">
          {usersToShow.map((user, index) => (
            <UsersSelectItem
              user={user}
              isSelected={isSelected(user)}
              toggleSelected={toggleSelected(user)}
              key={index}
            />
          ))}
        </VStack>
      )}
      {usersToShow.length === 0 && (
        <Center mt="3" mb="1">
          <Text color="gray.400">{t('common:usersSelect.usersNotFound')}</Text>
        </Center>
      )}
    </VStack>
  );
};
export default flowRight(withUserList)(UsersSelect);

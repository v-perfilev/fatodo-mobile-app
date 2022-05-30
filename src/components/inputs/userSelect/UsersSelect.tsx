import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../models/User';
import {Text} from 'native-base';
import {ArrayUtils} from '../../../shared/utils/ArrayUtils';
import ClearableTextInput from '../ClearableTextInput';
import UsersSelectItem from './UsersSelectItem';
import FVStack from '../../boxes/FVStack';
import FCenter from '../../boxes/FCenter';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';
import {UsersActions, UsersThunks} from '../../../store/users/usersActions';

type Props = {
  allowedIds: string[];
  ignoredIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelect: FC<Props> = ({allowedIds, ignoredIds, setUserIds}: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(UsersSelectors.users);
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
        prevState = ArrayUtils.deleteValue(prevState, user.id);
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
      dispatch(UsersThunks.fetchUsersByUsernamePart(filter))
        .unwrap()
        .then((users) => dispatch(UsersActions.handleUsers(users)));
    }
  };

  useEffect(() => {
    dispatch(UsersThunks.handleUserIds(allowedIds));
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
    <FVStack defaultSpace>
      <ClearableTextInput placeholder={t('inputs.search')} onChangeText={handleFilterChange} />
      {usersToShow.length > 0 && (
        <FVStack defaultSpace>
          {usersToShow.map((user, index) => (
            <UsersSelectItem
              user={user}
              isSelected={isSelected(user)}
              toggleSelected={toggleSelected(user)}
              key={index}
            />
          ))}
        </FVStack>
      )}
      {usersToShow.length === 0 && (
        <FCenter>
          <Text color="gray.400">{t('common:usersSelect.usersNotFound')}</Text>
        </FCenter>
      )}
    </FVStack>
  );
};
export default UsersSelect;

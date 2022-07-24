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
import InfoSelectors from '../../../store/info/infoSelectors';
import {InfoActions, InfoThunks} from '../../../store/info/infoActions';
import UserService from '../../../services/UserService';
import {MapUtils} from '../../../shared/utils/MapUtils';

type Props = {
  allowedIds: string[];
  ignoredIds: string[];
  setUserIds: (ids: string[]) => void;
};

const UsersSelect: FC<Props> = ({allowedIds, ignoredIds, setUserIds}: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(InfoSelectors.users);
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
    const idsToShow = allowedIds.filter((id) => !selectedIds.includes(id)).filter((id) => !ignoredIds.includes(id));
    const updatedUsersToShow = MapUtils.get(users, idsToShow);
    const selectedUsers = MapUtils.get(users, selectedIds);
    updatedUsersToShow.push(...selectedUsers);
    setUsersToShow(updatedUsersToShow);
  };

  const handleFilterChange = (text: string): void => {
    setFilter(text);
  };

  const loadUserFromFilter = (): void => {
    if (filter.length > 0) {
      UserService.getAllByUsernamePart(filter).then((response) => dispatch(InfoActions.handleUsers(response.data)));
    }
  };

  useEffect(() => {
    dispatch(InfoThunks.handleUserIds(allowedIds));
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

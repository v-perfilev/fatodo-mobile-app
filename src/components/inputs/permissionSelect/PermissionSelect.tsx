import React from 'react';
import {useTranslation} from 'react-i18next';
import {GroupPermission} from '../../../models/Group';
import PermissionSelectItem from './PermissionSelectItem';
import FVStack from '../../surfaces/FVStack';

type PermissionSelectProps = {
  permission: GroupPermission;
  setPermission: (permission: GroupPermission) => void;
};

const PermissionSelect = ({permission, setPermission}: PermissionSelectProps) => {
  const {t} = useTranslation();

  const selectRead = (): void => {
    setPermission('READ');
  };

  const selectEdit = (): void => {
    setPermission('EDIT');
  };

  const selectAdmin = (): void => {
    setPermission('ADMIN');
  };

  return (
    <FVStack space="1">
      <PermissionSelectItem title={t('group:roles.read')} active={permission === 'READ'} onPress={selectRead} />
      <PermissionSelectItem title={t('group:roles.edit')} active={permission === 'EDIT'} onPress={selectEdit} />
      <PermissionSelectItem title={t('group:roles.admin')} active={permission === 'ADMIN'} onPress={selectAdmin} />
    </FVStack>
  );
};

export default PermissionSelect;

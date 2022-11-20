import React from 'react';
import {useTranslation} from 'react-i18next';
import {GroupPermission} from '../../models/Group';
import {Text} from 'native-base';

type PermissionViewProps = {
  permission: GroupPermission;
};

export const PermissionView = ({permission}: PermissionViewProps) => {
  const {t} = useTranslation();

  let title = '';
  if (permission === 'ADMIN') {
    title = t('group:roles.admin');
  } else if (permission === 'EDIT') {
    title = t('group:roles.edit');
  }

  return (
    <Text isTruncated color="gray.400" fontSize="sm">
      {title}
    </Text>
  );
};

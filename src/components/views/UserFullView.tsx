import React, {useMemo} from 'react';
import {User, UserAccount} from '../../models/User';
import UrlPic from '../surfaces/UrlPic';
import FVStack from '../boxes/FVStack';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../boxes/FCenter';
import MultiLabeledBox, {MultiLabeledBoxItem} from '../surfaces/MultiLabeledBox';
import {UserUtils} from '../../shared/utils/UserUtils';
import FHStack from '../boxes/FHStack';

type UserFullViewProps = {
  user: User;
  account?: UserAccount;
  withoutUsername?: boolean;
};

export const UserFullView = ({user, account, withoutUsername}: UserFullViewProps) => {
  const {t, i18n} = useTranslation();

  const labeledItems = useMemo<MultiLabeledBoxItem[]>(() => {
    const items = [
      {label: t('account:fields.firstname.label'), value: user.firstname, showNotSet: true},
      {label: t('account:fields.lastname.label'), value: user.lastname, showNotSet: true},
    ];
    if (account) {
      items.push({label: t('account:fields.timezone.label'), value: account.settings.timezone, showNotSet: true});
    }
    return items;
  }, [user, account, i18n.language]);

  return (
    <FVStack space="3">
      <FCenter>
        <UrlPic size="2xl" file={user.imageFilename} border={1} />
      </FCenter>
      {!withoutUsername && (
        <FHStack space="1">
          <Text fontSize="xl" fontWeight="bold" color="primary.500" isTruncated>
            {UserUtils.getUsername(user, t)}
          </Text>
        </FHStack>
      )}
      <MultiLabeledBox items={labeledItems} isTruncated />
    </FVStack>
  );
};

export default UserFullView;

import React from 'react';
import {User, UserAccount} from '../../models/User';
import UrlPic from '../surfaces/UrlPic';
import FVStack from '../boxes/FVStack';
import LabeledBox from '../surfaces/LabeledBox';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../boxes/FCenter';

type UserFullViewProps = {
  user: User;
  account?: UserAccount;
};

export const UserFullView = ({user, account}: UserFullViewProps) => {
  const {t} = useTranslation();

  return (
    <FVStack defaultSpace>
      <FCenter>
        <UrlPic size="2xl" file={user.imageFilename} border={1} />
      </FCenter>
      <Text fontSize="xl" fontWeight="bold" color="primary.500" isTruncated>
        {user.username}
      </Text>
      <LabeledBox label={t('account:fields.firstname.label')} isText isTruncated showNotSet>
        {user.firstname}
      </LabeledBox>
      <LabeledBox label={t('account:fields.lastname.label')} isText isTruncated showNotSet>
        {user.lastname}
      </LabeledBox>
      {account && (
        <LabeledBox label={t('account:fields.timezone.label')} isText showNotSet>
          {account.info.timezone}
        </LabeledBox>
      )}
    </FVStack>
  );
};

export default UserFullView;

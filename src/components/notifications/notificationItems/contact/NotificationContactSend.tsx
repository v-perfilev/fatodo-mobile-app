import {Trans, useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import withEventContact, {WithEventContactProps} from '../../../../shared/hocs/withEvents/withEventContact';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProp} from '../../../../navigators/ProtectedNavigator';

const NotificationContactSend = ({firstUser, secondUser}: WithEventContactProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const {t} = useTranslation();

  const goToUserView = (): void => navigation.navigate('UserView', {userId: firstUser?.id});

  const title = t('event:contact.send.title');

  const image = <UserView user={firstUser} picSize="sm" />;

  const context = firstUser?.gender;
  const content = (
    <Trans
      i18nKey="event:contact.send.content"
      context={context}
      components={{firstUser: <UserLink user={firstUser} noLink />, secondUser: <UserLink user={secondUser} noLink />}}
    />
  );

  useEffect(() => {
    const ready = firstUser && secondUser;
    ready && setReady(true);
  }, [firstUser, secondUser]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToUserView} />;
};

export default withEventContact(NotificationContactSend);

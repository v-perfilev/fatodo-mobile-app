import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventItem, {WithEventItemProps} from '../../../../shared/hocs/withEvents/withEventItem';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import GroupLink from '../../../links/GroupLink';
import UserListLInks from '../../../links/UserListLinks';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';

const NotificationItemMemberAdd = ({user, group, users}: WithEventItemProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId: group?.id});

  const title = t('event:item.memberAdd.title');

  const image = <UserView user={user} picSize="sm" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:item.memberAdd.content"
      context={context}
      components={{
        user: <UserLink user={user} noLink />,
        group: <GroupLink group={group} noLink />,
        users: <UserListLInks users={users} noLink />,
      }}
    />
  );

  useEffect(() => {
    const ready = user && group && users.length > 0;
    ready && setReady(true);
  }, [user, group, users]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToGroupView} />;
};

export default withEventItem(NotificationItemMemberAdd);

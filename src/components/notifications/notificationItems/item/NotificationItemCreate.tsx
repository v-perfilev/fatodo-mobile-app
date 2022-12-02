import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventItem, {WithEventItemProps} from '../../../../shared/hocs/withEvents/withEventItem';
import UserView from '../../../views/UserView';
import UserLink from '../../../links/UserLink';
import GroupLink from '../../../links/GroupLink';
import ItemLink from '../../../links/ItemLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {TabNavigationProp} from '../../../../navigators/TabNavigator';

const NotificationItemCreate = ({user, group, item}: WithEventItemProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<TabNavigationProp>();
  const {t} = useTranslation();

  const goToItem = (): void => navigation.navigate('Groups', {screen: 'ItemView', params: {itemId: item?.id}});

  const title = t('event:item.create.title');

  const image = <UserView user={user} picSize="sm" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:item.create.content"
      context={context}
      components={{
        user: <UserLink user={user} noLink />,
        group: <GroupLink group={group} noLink />,
        item: <ItemLink item={item} noLink />,
      }}
    />
  );

  useEffect(() => {
    const ready = user && group && item;
    ready && setReady(true);
  }, [user, group, item]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToItem} />;
};

export default withEventItem(NotificationItemCreate);

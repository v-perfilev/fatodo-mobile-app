import {Text} from 'native-base';
import withEventItem, {WithEventItemProps} from '../../../../../shared/hocs/withEvents/withEventItem';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import GroupLink from '../../../../../components/links/GroupLink';
import EventListItemTemplate from '../EventListItemTemplate';
import EventListItemUsers from '../EventListItemUsers';
import UserView from '../../../../../components/views/UserView';

const EventItemMemberRole = ({user, group, users, date}: WithEventItemProps) => {
  const {t} = useTranslation();

  const title = t('event:item.memberRole.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);
  const Users = (): ReactElement => (users ? <EventListItemUsers users={users} /> : null);

  const image = <UserView user={user} picSize="md" />;

  const content = (
    <Text>
      <Trans
        i18nKey="event:item.memberRole.content"
        components={{user: <User />, group: <Group />, users: <Users />}}
      />
    </Text>
  );

  return <EventListItemTemplate image={image} title={title} content={content} date={date} />;
};

export default withEventItem(EventItemMemberRole);

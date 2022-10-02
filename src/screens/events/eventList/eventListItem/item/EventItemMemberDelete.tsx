import withEventItem, {WithEventItemProps} from '../../../../../shared/hocs/withEvents/withEventItem';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import GroupLink from '../../../../../components/links/GroupLink';
import EventListItemUsers from '../EventListItemUsers';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventItemMemberDelete = ({user, group, users, date}: WithEventItemProps) => {
  const {t} = useTranslation();

  const title = t('event:item.memberDelete.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);
  const Users = (): ReactElement => (users ? <EventListItemUsers users={users} /> : null);

  const image = <UserView user={user} picSize="md" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:item.memberDelete.content"
      context={context}
      components={{user: <User />, group: <Group />, users: <Users />}}
    />
  );

  const loading = !user || !group || !users.length;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventItem(EventItemMemberDelete);

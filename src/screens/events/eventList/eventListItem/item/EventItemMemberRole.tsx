import withEventItem, {WithEventItemProps} from '../../../../../shared/hocs/withEvents/withEventItem';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import UserLink from '../../../../../components/links/UserLink';
import GroupLink from '../../../../../components/links/GroupLink';
import EventListItemTemplate from '../EventListItemTemplate';
import EventListItemUsers from '../EventListItemUsers';
import UserView from '../../../../../components/views/UserView';

const EventItemMemberRole = ({user, group, users, date}: WithEventItemProps) => {
  const {t} = useTranslation();

  const title = t('event:item.memberRole.title');

  const image = <UserView user={user} picSize="md" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:item.memberRole.content"
      context={context}
      components={{
        user: <UserLink user={user} />,
        group: <GroupLink group={group} />,
        users: <EventListItemUsers users={users} />,
      }}
    />
  );

  const loading = !user || !group || !users.length;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventItem(EventItemMemberRole);

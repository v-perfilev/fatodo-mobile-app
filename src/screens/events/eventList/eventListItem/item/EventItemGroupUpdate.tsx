import withEventItem, {WithEventItemProps} from '../../../../../shared/hocs/withEvents/withEventItem';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import UserLink from '../../../../../components/links/UserLink';
import GroupLink from '../../../../../components/links/GroupLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventItemGroupUpdate = ({user, group, date}: WithEventItemProps) => {
  const {t} = useTranslation();

  const title = t('event:item.groupUpdate.title');

  const image = <UserView user={user} picSize="md" />;

  const context = user?.gender;
  const content = (
    <Trans
      i18nKey="event:item.groupUpdate.content"
      context={context}
      components={{user: <UserLink user={user} />, group: <GroupLink group={group} />}}
    />
  );

  const loading = !user || !group;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventItem(EventItemGroupUpdate);

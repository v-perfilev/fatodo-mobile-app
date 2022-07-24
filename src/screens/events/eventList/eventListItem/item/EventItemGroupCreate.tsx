import {Text} from 'native-base';
import withEventItem, {WithEventItemProps} from '../../../../../shared/hocs/withEvents/withEventItem';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import GroupLink from '../../../../../components/links/GroupLink';
import EventListItemTemplate from '../EventListItemTemplate';

const EventItemGroupCreate = ({user, group, date}: WithEventItemProps) => {
  const {t} = useTranslation();

  const title = t('event:item.groupCreate.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);

  let content = (
    <Text>
      <Trans i18nKey="event:item.groupCreate.content" components={{user: <User />, group: <Group />}} />
    </Text>
  );

  return <EventListItemTemplate title={title} content={content} date={date} />;
};

export default withEventItem(EventItemGroupCreate);

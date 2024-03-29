import withEventReminder, {WithEventReminderProps} from '../../../../../shared/hocs/withEvents/withEventReminder';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import GroupLink from '../../../../../components/links/GroupLink';
import ItemLink from '../../../../../components/links/ItemLink';
import EventListItemTemplate from '../EventListItemTemplate';
import IconPic from '../../../../../components/surfaces/IconPic';
import AlarmIcon from '../../../../../components/icons/AlarmIcon';

const EventReminder = ({group, item, date}: WithEventReminderProps) => {
  const {t} = useTranslation();

  const title = t('event:reminder.title');

  const image = <IconPic icon={<AlarmIcon />} size="md" />;

  const content = (
    <Trans
      i18nKey="event:reminder.content"
      components={{group: <GroupLink group={group} />, item: <ItemLink item={item} />}}
    />
  );

  const loading = !group || !item;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventReminder(EventReminder);

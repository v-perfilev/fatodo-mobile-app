import withEventReminder, {WithEventReminderProps} from '../../../../../shared/hocs/withEvents/withEventReminder';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import GroupLink from '../../../../../components/links/GroupLink';
import ItemLink from '../../../../../components/links/ItemLink';
import EventListItemTemplate from '../EventListItemTemplate';
import IconPic from '../../../../../components/surfaces/IconPic';
import AlarmIcon from '../../../../../components/icons/AlarmIcon';

const EventReminder = ({group, item, date}: WithEventReminderProps) => {
  const {t} = useTranslation();

  const title = t('event:reminder.title');

  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);
  const Item = (): ReactElement => (item ? <ItemLink item={item} /> : null);

  const image = <IconPic icon={<AlarmIcon />} size="md" />;

  let content = <Trans i18nKey="event:reminder.content" components={{group: <Group />, item: <Item />}} />;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} />;
};

export default withEventReminder(EventReminder);

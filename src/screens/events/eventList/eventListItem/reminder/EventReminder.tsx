import {Text} from 'native-base';
import withEventReminder, {WithEventReminderProps} from '../../../../../shared/hocs/withEvents/withEventReminder';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import GroupLink from '../../../../../components/links/GroupLink';
import ItemLink from '../../../../../components/links/ItemLink';
import EventListItemTemplate from '../EventListItemTemplate';

const EventReminder = ({group, item, date}: WithEventReminderProps) => {
  const {t} = useTranslation();

  const title = t('event:reminder.title');

  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);
  const Item = (): ReactElement => (item ? <ItemLink item={item} /> : null);

  let content = (
    <Text>
      <Trans i18nKey="event:reminder.content" components={{group: <Group />, item: <Item />}} />
    </Text>
  );

  return <EventListItemTemplate title={title} content={content} date={date} />;
};

export default withEventReminder(EventReminder);

import {Box} from 'native-base';
import withEventReminder, {WithEventReminderProps} from '../../../../shared/hocs/withEvents/withEventReminder';

const EventReminder = ({group}: WithEventReminderProps) => {
  return <Box>{group.title}</Box>;
};

export default withEventReminder(EventReminder);

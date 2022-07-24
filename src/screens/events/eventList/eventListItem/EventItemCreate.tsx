import {Box} from 'native-base';
import withEventItem, {WithEventItemProps} from '../../../../shared/hocs/withEvents/withEventItem';

const EventItemCreate = ({user}: WithEventItemProps) => {
  return <Box>{user.username}</Box>;
};

export default withEventItem(EventItemCreate);

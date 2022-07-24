import {Box} from 'native-base';
import withEventItem, {WithEventItemProps} from '../../../../shared/hocs/withEvents/withEventItem';

const EventItemGroupCreate = ({user}: WithEventItemProps) => {
  return <Box>{user.username}</Box>;
};

export default withEventItem(EventItemGroupCreate);

import {Box} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';

const EventChatUpdate = ({user}: WithEventChatProps) => {
  return <Box>{user.username}</Box>;
};

export default withEventChat(EventChatUpdate);

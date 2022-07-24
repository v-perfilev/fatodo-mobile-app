import {Box} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';

const EventChatCreate = ({user}: WithEventChatProps) => {
  return <Box>{user?.username}</Box>;
};

export default withEventChat(EventChatCreate);

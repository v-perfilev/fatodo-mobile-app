import {Box} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';

const EventChatReaction = ({user}: WithEventChatProps) => {
  return <Box>{user.username}</Box>;
};

export default withEventChat(EventChatReaction);

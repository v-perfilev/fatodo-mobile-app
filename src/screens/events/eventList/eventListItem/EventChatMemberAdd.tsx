import {Box} from 'native-base';
import withEventChat, {WithEventChatProps} from '../../../../shared/hocs/withEvents/withEventChat';

const EventChatMemberAdd = ({user}: WithEventChatProps) => {
  return <Box>{user.username}</Box>;
};

export default withEventChat(EventChatMemberAdd);

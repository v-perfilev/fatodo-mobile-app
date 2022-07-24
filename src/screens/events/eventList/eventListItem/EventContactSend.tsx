import {Box} from 'native-base';
import withEventContact, {WithEventContactProps} from '../../../../shared/hocs/withEvents/withEventContact';

const EventContactSend = ({firstUser}: WithEventContactProps) => {
  return <Box>{firstUser.username}</Box>;
};

export default withEventContact(EventContactSend);

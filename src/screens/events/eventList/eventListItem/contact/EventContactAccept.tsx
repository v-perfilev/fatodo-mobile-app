import {Box} from 'native-base';
import withEventContact, {WithEventContactProps} from '../../../../../shared/hocs/withEvents/withEventContact';

const EventContactAccept = ({firstUser}: WithEventContactProps) => {
  return <Box>{firstUser.username}</Box>;
};

export default withEventContact(EventContactAccept);

import {Box} from 'native-base';
import withEventComment, {WithEventCommentProps} from '../../../../shared/hocs/withEvents/withEventComment';

const EventCommentAdd = ({user}: WithEventCommentProps) => {
  return <Box>{user.username}</Box>;
};

export default withEventComment(EventCommentAdd);

import React from 'react';
import UserView from '../../../../components/views/UserView';
import FHStack from '../../../../components/boxes/FHStack';
import {User} from '../../../../models/User';

type ChatMessageStatusesDialogItemProps = {
  user: User;
};

const ChatMessageStatusesDialogItem = ({user}: ChatMessageStatusesDialogItemProps) => {
  return (
    <FHStack grow defaultSpace alignItems="center">
      <UserView user={user} withUsername withUserPic picSize="sm" />
    </FHStack>
  );
};

export default ChatMessageStatusesDialogItem;

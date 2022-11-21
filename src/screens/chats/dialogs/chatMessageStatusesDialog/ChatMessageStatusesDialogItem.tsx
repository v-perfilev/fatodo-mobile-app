import React from 'react';
import UserView from '../../../../components/views/UserView';
import FHStack from '../../../../components/boxes/FHStack';
import {User} from '../../../../models/User';

type ChatMessageStatusesDialogItemProps = {
  user: User;
  close: () => void;
};

const ChatMessageStatusesDialogItem = ({user, close}: ChatMessageStatusesDialogItemProps) => {
  return (
    <FHStack grow space="3" alignItems="center">
      <UserView user={user} withUsername withUserPic picSize="sm" onPressCallBack={close} />
    </FHStack>
  );
};

export default ChatMessageStatusesDialogItem;

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import ConfirmationDialog from '../../../../components/modals/ConfirmationDialog';
import UserView from '../../../../components/views/UserView';
import UserMinusIcon from '../../../../components/icons/UserMinusIcon';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {Chat} from '../../../../models/Chat';
import IconButton from '../../../../components/controls/IconButton';
import {User} from '../../../../models/User';
import ChatThunks from '../../../../store/chat/chatThunks';

type ChatMembersDialogMemberProps = {
  chat: Chat;
  user: User;
};

const ChatMembersDialogMember = ({chat, user}: ChatMembersDialogMemberProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const [showRemovingConfirmation, setShowRemovingConfirmation] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);

  const switchRemovingConfirmation = (): void => {
    setShowRemovingConfirmation((prevState) => !prevState);
  };

  const removeUserFromChat = (): void => {
    setRemovingLoading(true);
    dispatch(ChatThunks.removeChatMember({chat, userId: user.id}))
      .unwrap()
      .finally(() => {
        setRemovingLoading(false);
        setShowRemovingConfirmation(false);
      });
  };

  const removingConfirmation = (
    <ConfirmationDialog
      open={showRemovingConfirmation}
      title={t('chat:removeMember.title')}
      content={t('chat:removeMember.text', {username: user.username})}
      onAgree={removeUserFromChat}
      onDisagree={switchRemovingConfirmation}
      loading={removingLoading}
    />
  );

  return (
    <FHStack>
      <FHStack grow smallSpace alignItems="center">
        <UserView user={user} withUsername withUserPic picSize="sm" />
      </FHStack>
      {chat && !chat.isDirect && user.id !== account.id && (
        <IconButton size="small" onPress={switchRemovingConfirmation}>
          <UserMinusIcon color="error.500" />
        </IconButton>
      )}
      {removingConfirmation}
    </FHStack>
  );
};

export default ChatMembersDialogMember;

import React, {useCallback} from 'react';
import {Message} from '../../../../models/Message';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import FBox from '../../../../components/boxes/FBox';

type ChatListMessageIncomingProps = {
  message: Message;
};

const ChatListMessageIncoming = ({message}: ChatListMessageIncomingProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const user = useAppSelector((state) => userSelector(state, message.userId));

  return (
    <FHStack smallSpace>
      <Text color="gray.400" fontWeight="bold" fontSize="xs">
        {user?.username}:
      </Text>
      {!message.isDeleted && (
        <FBox>
          <Text isTruncated fontSize="xs">
            {message.text}
          </Text>
        </FBox>
      )}
      {message.isDeleted && (
        <Text color="gray.400" fontWeight="bold" fontSize="xs">
          {t('chat:message.deleted')}
        </Text>
      )}
    </FHStack>
  );
};

export default ChatListMessageIncoming;

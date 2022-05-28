import React, {memo, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {Message, MessageReactionType, messageReactionTypes} from '../../../../models/Message';
import FVStack from '../../../../components/boxes/FVStack';
import ReactionView from '../../../../components/views/ReactionView';
import ChatThunks from '../../../../store/chat/chatThunks';
import PressableButton from '../../../../components/controls/PressableButton';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';

const buildReactionMap = (message: Message): Map<MessageReactionType, number> => {
  const map = new Map();
  messageReactionTypes.forEach((reaction) => {
    const count = message?.reactions.filter((r) => r.type === reaction).length;
    map.set(reaction, count);
  });
  return map;
};

type ChatViewMessageReactions = {
  message: Message;
};

const ChatContentMessageReactions = ({message}: ChatViewMessageReactions) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const [reactionMap, setReactionMap] = useState<Map<MessageReactionType, number>>(buildReactionMap(message));
  const [activeReaction, setActiveReaction] = useState<MessageReactionType>();

  const isOutcoming = useMemo<boolean>(() => {
    return message.userId === account?.id;
  }, [message]);

  const updateReactionsMap = (): void => {
    const newReactionMap = buildReactionMap(message);
    setReactionMap(newReactionMap);
  };

  const updateActiveReaction = (): void => {
    const reaction = message.reactions.find((r) => r.userId === account?.id);
    setActiveReaction(reaction?.type);
  };

  const handlePress = useCallback(
    (r: MessageReactionType) => (): void => {
      if (r === activeReaction) {
        dispatch(ChatThunks.noReaction(message.id));
      } else if (r === 'LIKE') {
        dispatch(ChatThunks.likeReaction(message.id));
      } else if (r === 'DISLIKE') {
        dispatch(ChatThunks.dislikeReaction(message.id));
      }
    },
    [message, activeReaction],
  );

  useEffect(() => {
    updateReactionsMap();
    updateActiveReaction();
  }, [message.reactions]);

  const reaction = (r: MessageReactionType, key: number): ReactElement => {
    const count = reactionMap.get(r);
    const color = r === activeReaction ? 'primary.500' : 'gray.400';
    const onPress = handlePress(r);
    return (
      <PressableButton onPress={onPress} isDisabled={isOutcoming} key={key}>
        <FHStack h="20px" smallSpace reversed alignItems="center">
          {count > 0 && (
            <Text color="gray.400" fontSize="xs">
              {count}
            </Text>
          )}
          <ReactionView statusType={r} size="sm" color={color} />
        </FHStack>
      </PressableButton>
    );
  };

  return <FVStack smallSpace>{Array.from(reactionMap.keys()).map(reaction)}</FVStack>;
};

export default memo(ChatContentMessageReactions);

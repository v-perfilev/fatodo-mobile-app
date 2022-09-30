import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {Message, MessageReactionType, messageReactionTypes} from '../../../../models/Message';
import FVStack from '../../../../components/boxes/FVStack';
import ReactionView from '../../../../components/views/ReactionView';
import PressableButton from '../../../../components/controls/PressableButton';
import FHStack from '../../../../components/boxes/FHStack';
import {Box, Text} from 'native-base';
import {ChatActions} from '../../../../store/chat/chatActions';

const buildReactionMap = (message: Message, isOutcoming: boolean): Map<MessageReactionType, number> => {
  const map = new Map();
  messageReactionTypes.forEach((reaction) => {
    const count = message?.reactions.filter((r) => r.type === reaction).length;
    if (!isOutcoming || count > 0) {
      map.set(reaction, count);
    }
  });
  return map;
};

type ChatViewMessageReactionsProps = {
  message: Message;
  isOutcoming: boolean;
};

const ChatViewMessageReactions = ({message, isOutcoming}: ChatViewMessageReactionsProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const [activeReaction, setActiveReaction] = useState<MessageReactionType>();
  const [reactionMap, setReactionMap] = useState<Map<MessageReactionType, number>>(
    buildReactionMap(message, isOutcoming),
  );

  const updateReactionsMap = (): void => {
    const newReactionMap = buildReactionMap(message, isOutcoming);
    setReactionMap(newReactionMap);
  };

  const updateActiveReaction = (): void => {
    const reaction = message.reactions.find((r) => r.userId === account.id);
    setActiveReaction(reaction?.type);
  };

  const handlePress = useCallback(
    (r: MessageReactionType) => (): void => {
      if (r === activeReaction) {
        dispatch(ChatActions.noReactionThunk(message));
      } else if (r === 'LIKE') {
        dispatch(ChatActions.likeReactionThunk(message));
      } else if (r === 'DISLIKE') {
        dispatch(ChatActions.dislikeReactionThunk(message));
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
    const color = r === activeReaction ? 'primary.500' : 'gray.300';
    const onPress = handlePress(r);

    const iconWithCount = (
      <FHStack h="20px" smallSpace reversed alignItems="center">
        {count > 0 && (
          <Text color="gray.500" fontSize="xs">
            {count}
          </Text>
        )}
        <ReactionView reactionType={r} size="sm" color={color} />
      </FHStack>
    );

    return isOutcoming ? (
      <Box key={key}>{iconWithCount}</Box>
    ) : (
      <PressableButton onPress={onPress} key={key}>
        {iconWithCount}
      </PressableButton>
    );
  };

  return (
    <FVStack mt="1.5" smallSpace>
      {Array.from(reactionMap.keys()).map(reaction)}
    </FVStack>
  );
};

export default memo(ChatViewMessageReactions);

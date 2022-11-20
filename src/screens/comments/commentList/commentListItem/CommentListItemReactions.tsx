import React, {ReactElement, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import FVStack from '../../../../components/boxes/FVStack';
import ReactionView from '../../../../components/views/ReactionView';
import PressableButton from '../../../../components/controls/PressableButton';
import FHStack from '../../../../components/boxes/FHStack';
import {Box, Text, useColorModeValue} from 'native-base';
import {Comment, CommentReactionType, commentReactionTypes} from '../../../../models/Comment';
import {CommentsActions} from '../../../../store/comments/commentsActions';

const buildReactionMap = (comment: Comment, isOwnComment: boolean): Map<CommentReactionType, number> => {
  const map = new Map();
  commentReactionTypes.forEach((reaction) => {
    const count = comment?.reactions.filter((r) => r.type === reaction).length;
    if (!isOwnComment || count > 0) {
      map.set(reaction, count);
    }
  });
  return map;
};

type CommentListItemReactionsProps = {
  comment: Comment;
  isOwnComment: boolean;
};

const CommentListItemReactions = ({comment, isOwnComment}: CommentListItemReactionsProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const [activeReaction, setActiveReaction] = useState<CommentReactionType>();
  const [reactionMap, setReactionMap] = useState<Map<CommentReactionType, number>>(
    buildReactionMap(comment, isOwnComment),
  );

  const updateReactionsMap = (): void => {
    const newReactionMap = buildReactionMap(comment, isOwnComment);
    setReactionMap(newReactionMap);
  };

  const updateActiveReaction = (): void => {
    const reaction = comment.reactions.find((r) => r.userId === account.id);
    setActiveReaction(reaction?.type);
  };

  const handlePress = (r: CommentReactionType) => (): void => {
    if (r === activeReaction) {
      dispatch(CommentsActions.noReactionThunk({comment, account}));
    } else if (r === 'LIKE') {
      dispatch(CommentsActions.likeReactionThunk({comment, account}));
    } else if (r === 'DISLIKE') {
      dispatch(CommentsActions.dislikeReactionThunk({comment, account}));
    }
  };

  useEffect(() => {
    updateReactionsMap();
    updateActiveReaction();
  }, [comment.reactions]);

  const reactionColor = useColorModeValue('gray.300', 'gray.500');

  const reaction = (r: CommentReactionType, key: number): ReactElement => {
    const count = reactionMap.get(r);
    const color = r === activeReaction ? 'primary.500' : reactionColor;
    const onPress = handlePress(r);

    const iconWithCount = (
      <FHStack h="20px" space="1" alignItems="center">
        {count > 0 && (
          <Text color="gray.500" fontSize="sm">
            {count}
          </Text>
        )}
        <ReactionView reactionType={r} size="sm" color={color} />
      </FHStack>
    );

    return isOwnComment ? (
      <Box key={key}>{iconWithCount}</Box>
    ) : (
      <PressableButton onPress={onPress} key={key}>
        {iconWithCount}
      </PressableButton>
    );
  };

  return (
    <FVStack mt="1.5" space="1">
      {Array.from(reactionMap.keys()).map(reaction)}
    </FVStack>
  );
};

export default CommentListItemReactions;

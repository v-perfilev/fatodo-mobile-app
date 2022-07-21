import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {User} from '../../../../models/User';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {Comment, CommentReaction} from '../../../../models/Comment';
import CommentReactionsDialogItem from './CommentReactionsDialogItem';

type CommentReactionWithUser = {
  reaction: CommentReaction;
  user?: User;
};

export type CommentReactionsDialogProps = {
  comment: Comment;
  show: boolean;
  close: () => void;
};

export const defaultCommentReactionsDialogProps: Readonly<CommentReactionsDialogProps> = {
  comment: null,
  show: false,
  close: (): void => null,
};

const CommentReactionsDialog = ({comment, show, close}: CommentReactionsDialogProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(InfoSelectors.users);
  const [reactions, setReactions] = useState<CommentReactionWithUser[]>([]);
  const [reactionsToShow, setReactionsToShow] = useState<CommentReactionWithUser[]>([]);

  const filterReactionsToShow = (text: string): void => {
    const updatedList = reactions.filter((reaction) => reaction.user?.username?.includes(text));
    setReactionsToShow(updatedList);
  };

  const combineUsersWithReactions = (): void => {
    const userFilter =
      (userId: string) =>
      (user: User): boolean =>
        user.id === userId;
    const updatedList = comment.reactions.map((reaction) => ({
      reaction,
      user: users.find(userFilter(reaction.userId)),
    }));
    setReactions(updatedList);
    setReactionsToShow(updatedList);
  };

  useEffect(() => {
    if (comment && users) {
      combineUsersWithReactions();
    }
  }, [comment?.reactions, users]);

  const content = (
    <FVStack defaultSpace>
      <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={filterReactionsToShow} />
      {reactionsToShow.length > 0 && (
        <FVStack defaultSpace>
          {reactionsToShow.map((reaction) => (
            <CommentReactionsDialogItem reaction={reaction.reaction} user={reaction.user} key={reaction.user.id} />
          ))}
        </FVStack>
      )}
      {reactions.length === 0 && (
        <FCenter>
          <Text color="gray.400">{t('comment:reactions.reactionsNotFound')}</Text>
        </FCenter>
      )}
    </FVStack>
  );

  return <ModalDialog open={show} close={close} title={t('comment:reactions.title')} content={content} />;
};

export default CommentReactionsDialog;

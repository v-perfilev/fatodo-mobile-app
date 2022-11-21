import React, {memo} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {Comment} from '../../../models/Comment';
import {CommentsActions} from '../../../store/comments/commentsActions';

export type CommentDeleteDialogProps = {
  comment: Comment;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultCommentDeleteDialogProps: Readonly<CommentDeleteDialogProps> = {
  comment: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const CommentDeleteDialog = ({comment, show, close, onSuccess = () => null}: CommentDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(CommentsActions.deleteCommentThunk(comment))
      .unwrap()
      .then(() => {
        onSuccess();
        close();
      })
      .finally(() => setLoading(false));
  };

  const onDisagree = (): void => {
    close();
  };

  return (
    <ConfirmationDialog
      open={show}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('comment:deleteComment.title')}
      content={t('comment:deleteComment.text')}
      loading={loading}
    />
  );
};

export default memo(CommentDeleteDialog);

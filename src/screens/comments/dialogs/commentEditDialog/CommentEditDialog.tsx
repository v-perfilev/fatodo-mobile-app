import ModalDialog from '../../../../components/modals/ModalDialog';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../../store/store';
import CommentEditForm from './CommentEditForm';
import {Comment} from '../../../../models/Comment';
import {CommentDTO} from '../../../../models/dto/CommentDTO';
import {CommentsThunks} from '../../../../store/comments/commentsActions';

export type CommentEditDialogProps = {
  comment: Comment;
  show: boolean;
  close: () => void;
};

export const defaultCommentEditDialogProps: Readonly<CommentEditDialogProps> = {
  comment: null,
  show: false,
  close: (): void => null,
};

const CommentEditDialog = ({comment, show, close}: CommentEditDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (dto: CommentDTO, stopSubmitting: () => void): void => {
    dispatch(CommentsThunks.editComment({comment, dto}))
      .unwrap()
      .then(() => close())
      .catch(() => stopSubmitting());
  };

  const content = <CommentEditForm comment={comment} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('comment:editComment.title')} content={content} size="xl" />;
};

export default CommentEditDialog;

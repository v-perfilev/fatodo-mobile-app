import React from 'react';
import {useTranslation} from 'react-i18next';
import Menu, {MenuItemProps, MenuTrigger} from '../../../../components/controls/Menu';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import ReactionsIcon from '../../../../components/icons/ReactionsIcon';
import {Comment} from '../../../../models/Comment';
import {useCommentDialogContext} from '../../../../shared/contexts/dialogContexts/CommentDialogContext';
import {Platform} from 'react-native';

type CommentListItemMenuProps = {
  comment: Comment;
  isOwnComment: boolean;
};

const CommentListItemMenu = ({comment, isOwnComment}: CommentListItemMenuProps) => {
  const {t} = useTranslation();
  const {showCommentReactionsDialog, showCommentEditDialog, showCommentDeleteDialog} = useCommentDialogContext();

  const openReactionsDialog = (): void => {
    showCommentReactionsDialog(comment);
  };

  const editComment = (): void => {
    showCommentEditDialog(comment);
  };

  const deleteComment = (): void => {
    showCommentDeleteDialog(comment);
  };

  const menuItems: MenuItemProps[] = [
    {
      action: openReactionsDialog,
      icon: <ReactionsIcon color="primary.500" />,
      text: t('comment:comment.actions.reactions'),
    },
    {
      action: editComment,
      icon: <EditIcon color="primary.500" />,
      text: t('comment:comment.actions.edit'),
      hidden: !isOwnComment || comment.isDeleted,
    },
    {
      action: deleteComment,
      icon: <DeleteIcon color="error.500" />,
      text: t('comment:comment.actions.delete'),
      hidden: !isOwnComment || comment.isDeleted,
    },
  ];

  const triggerSize = Platform.OS === 'ios' ? 'lg' : 'md';

  return <Menu trigger={MenuTrigger(triggerSize)} menuItems={menuItems} />;
};

export default CommentListItemMenu;

import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import Menu, {MenuItem, MenuItemProps} from '../../../../components/controls/Menu';
import PressableButton from '../../../../components/controls/PressableButton';
import EditIcon from '../../../../components/icons/EditIcon';
import DeleteIcon from '../../../../components/icons/DeleteIcon';
import DotsVerticalIcon from '../../../../components/icons/DotsVerticalIcon';
import ReactionsIcon from '../../../../components/icons/ReactionsIcon';
import {Comment} from '../../../../models/Comment';
import ReplyIcon from '../../../../components/icons/ReplyIcon';
import {useCommentDialogContext} from '../../../../shared/contexts/dialogContexts/CommentDialogContext';

type CommentsViewCommentMenuProps = {
  comment: Comment;
  isOwnComment: boolean;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentsViewCommentMenu = ({comment, isOwnComment, setReference}: CommentsViewCommentMenuProps) => {
  const {t} = useTranslation();
  const {showCommentReactionsDialog, showCommentEditDialog, showCommentDeleteDialog} = useCommentDialogContext();

  const replyToComment = (): void => {
    setReference(comment);
  };

  const openReactionsDialog = (): void => {
    showCommentReactionsDialog(comment);
  };

  const editComment = (): void => {
    showCommentEditDialog(comment);
  };

  const deleteComment = (): void => {
    showCommentDeleteDialog(comment);
  };

  const menuItems = [
    {
      action: replyToComment,
      icon: <ReplyIcon color="primary.500" />,
      text: t('comment:comment.buttons.response'),
    },
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
  ] as MenuItemProps[];

  return (
    <Menu
      trigger={(triggerProps) => (
        <PressableButton {...triggerProps}>
          <DotsVerticalIcon color="primary.500" size="md" />
        </PressableButton>
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};

export default CommentsViewCommentMenu;

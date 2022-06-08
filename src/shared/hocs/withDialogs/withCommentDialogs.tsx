import * as React from 'react';
import {ComponentType, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {Comment} from '../../../models/Comment';
import CommentEditDialog, {
  CommentEditDialogProps,
  defaultCommentEditDialogProps,
} from '../../../screens/comments/dialogs/commentEditDialog/CommentEditDialog';
import CommentReactionsDialog, {
  CommentReactionsDialogProps,
  defaultCommentReactionsDialogProps,
} from '../../../screens/comments/dialogs/commentReactionsDialog/CommentReactionsDialog';
import {CommentDialogContext} from '../../contexts/dialogContexts/CommentDialogContext';
import CommentDeleteDialog, {
  CommentDeleteDialogProps,
  defaultCommentDeleteDialogProps,
} from '../../../screens/comments/dialogs/CommentDeleteDialog';

enum CommentDialogs {
  REACTIONS = 'COMMENT_REACTIONS_DIALOG',
  EDIT = 'COMMENT_EDIT_DIALOG',
  DELETE = 'COMMENT_DELETE_DIALOG',
}

const withCommentDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, updateDialogProps, clearDialogProps} = useDialogContext();

  const showCommentReactionsDialog = useCallback(
    (comment: Comment): void => {
      const show = true;
      const close = (): void => updateDialogProps(CommentDialogs.REACTIONS, {show: false});
      const props = {comment, show, close} as CommentReactionsDialogProps;
      setDialogProps(CommentDialogs.REACTIONS, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const showCommentEditDialog = useCallback(
    (comment: Comment): void => {
      const show = true;
      const close = (): void => updateDialogProps(CommentDialogs.EDIT, {show: false});
      const props = {comment, show, close} as CommentEditDialogProps;
      setDialogProps(CommentDialogs.EDIT, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const showCommentDeleteDialog = useCallback(
    (comment: Comment, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(CommentDialogs.DELETE);
      const props = {comment, show, close, onSuccess} as CommentDeleteDialogProps;
      setDialogProps(CommentDialogs.DELETE, props);
    },
    [setDialogProps, clearDialogProps],
  );

  const initDialogs = (): void => {
    handleDialog(CommentDialogs.REACTIONS, CommentReactionsDialog, defaultCommentReactionsDialogProps);
    handleDialog(CommentDialogs.EDIT, CommentEditDialog, defaultCommentEditDialogProps);
    handleDialog(CommentDialogs.DELETE, CommentDeleteDialog, defaultCommentDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showCommentReactionsDialog,
    showCommentEditDialog,
    showCommentDeleteDialog,
  };

  return (
    <CommentDialogContext.Provider value={context}>
      <Component {...props} />
    </CommentDialogContext.Provider>
  );
};

export default withCommentDialogs;

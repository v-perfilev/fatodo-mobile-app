import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
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
import {flowRight} from 'lodash';

enum CommentDialogs {
  REACTIONS = 'COMMENT_REACTIONS_DIALOG',
  EDIT = 'COMMENT_EDIT_DIALOG',
  DELETE = 'COMMENT_DELETE_DIALOG',
}

const withCommentDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, updateDialogProps, clearDialogProps} = useDialogContext();

  const showCommentReactionsDialog = useCallback((comment: Comment): void => {
    const show = true;
    const close = (): void => updateDialogProps(CommentDialogs.REACTIONS, {show: false});
    const props: CommentReactionsDialogProps = {comment, show, close};
    setDialogProps(CommentDialogs.REACTIONS, props);
  }, []);

  const showCommentEditDialog = useCallback((comment: Comment): void => {
    const show = true;
    const close = (): void => updateDialogProps(CommentDialogs.EDIT, {show: false});
    const props: CommentEditDialogProps = {comment, show, close};
    setDialogProps(CommentDialogs.EDIT, props);
  }, []);

  const showCommentDeleteDialog = useCallback((comment: Comment): void => {
    const show = true;
    const close = (): void => clearDialogProps(CommentDialogs.DELETE);
    const props: CommentDeleteDialogProps = {comment, show, close};
    setDialogProps(CommentDialogs.DELETE, props);
  }, []);

  useEffect(() => {
    handleDialog(CommentDialogs.REACTIONS, CommentReactionsDialog, defaultCommentReactionsDialogProps);
    handleDialog(CommentDialogs.EDIT, CommentEditDialog, defaultCommentEditDialogProps);
    handleDialog(CommentDialogs.DELETE, CommentDeleteDialog, defaultCommentDeleteDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showCommentReactionsDialog,
      showCommentEditDialog,
      showCommentDeleteDialog,
    }),
    [showCommentReactionsDialog, showCommentEditDialog, showCommentDeleteDialog],
  );

  return (
    <CommentDialogContext.Provider value={context}>
      <Component {...props} />
    </CommentDialogContext.Provider>
  );
};

export default flowRight([memo, withCommentDialogs]);

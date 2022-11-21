import * as React from 'react';
import {useContext} from 'react';
import {Comment} from '../../../models/Comment';

interface CommentDialogState {
  showCommentReactionsDialog: (comment: Comment) => void;
  showCommentEditDialog: (comment: Comment) => void;
  showCommentDeleteDialog: (comment: Comment, onSuccess?: () => void) => void;
}

export const CommentDialogContext = React.createContext<CommentDialogState>(null);
export const useCommentDialogContext = (): CommentDialogState => useContext(CommentDialogContext);

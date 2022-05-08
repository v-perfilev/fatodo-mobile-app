import * as React from 'react';
import {useContext} from 'react';
import {User} from '../../../models/User';
import {Comment} from '../../../models/Comment';

interface CommentDialogState {
  showCommentReactionsDialog: (comment: Comment, users: User[]) => void;
  showCommentEditDialog: (comment: Comment) => void;
}

export const CommentDialogContext = React.createContext<CommentDialogState>(null);
export const useCommentDialogContext = (): CommentDialogState => useContext(CommentDialogContext);

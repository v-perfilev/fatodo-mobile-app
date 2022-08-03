import {AbstractAuditing} from './AbstractAuditing';
import {CommentDTO} from './dto/CommentDTO';

export const commentReactionTypes = ['LIKE', 'DISLIKE'];

export type CommentReactionType = 'LIKE' | 'DISLIKE';

export interface CommentThreadInfo {
  parentId: string;
  targetId: string;
  type: string;
  count: number;
  unread: number;
}

export interface CommentInfo {
  id: string;
  text: string;
}

export interface Comment extends AbstractAuditing {
  id: string;
  targetId: string;
  userId: string;
  text: string;
  isDeleted: boolean;

  reference?: ReferenceComment;

  reactions: CommentReaction[];
}

export interface ReferenceComment extends AbstractAuditing {
  id: string;
  userId: string;
}

export interface CommentReaction {
  commentId: string;
  userId: string;
  type: CommentReactionType;
  timestamp: Date;
}

export interface CommentReactions {
  targetId: string;
  commentId: string;
  reactions: CommentReaction[];
}

export const buildCommentReaction = (
  commentId: string,
  userId: string,
  type: CommentReactionType,
): CommentReaction => ({
  commentId,
  userId,
  type,
  timestamp: new Date(),
});

export const buildCommentFromDTO = (dto: CommentDTO, targetId: string, userId: string): Comment => ({
  ...dto,
  id: '',
  targetId,
  userId,
  isDeleted: false,
  reactions: [],
  createdAt: new Date().getTime(),
  createdBy: userId,
});

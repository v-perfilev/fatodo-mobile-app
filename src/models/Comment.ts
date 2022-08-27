import {AbstractAuditing} from './AbstractAuditing';
import {CommentDTO} from './dto/CommentDTO';

export const commentReactionTypes = ['LIKE', 'DISLIKE'];

export type CommentReactionType = 'LIKE' | 'DISLIKE' | 'NONE';

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
  parentId: string;
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
  parentId: string;
  targetId: string;
  commentId: string;
  userId: string;
  type: CommentReactionType;
  date: number;
}

export const buildCommentReaction = (comment: Comment, userId: string, type: CommentReactionType): CommentReaction => ({
  parentId: comment.parentId,
  targetId: comment.targetId,
  commentId: comment.id,
  userId,
  type,
  date: new Date().getTime(),
});

export const buildCommentFromDTO = (dto: CommentDTO, parentId: string, targetId: string, userId: string): Comment => ({
  ...dto,
  id: '',
  parentId,
  targetId,
  userId,
  isDeleted: false,
  reactions: [],
  createdAt: new Date().getTime(),
  createdBy: userId,
});

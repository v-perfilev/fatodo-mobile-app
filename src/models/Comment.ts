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
  targetId: string;
  commentId: string;
  userId: string;
  type: CommentReactionType;
  date: number;
}

export const buildCommentReaction = (
  targetId: string,
  commentId: string,
  userId: string,
  type: CommentReactionType,
): CommentReaction => ({
  targetId,
  commentId,
  userId,
  type,
  date: new Date().getTime(),
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

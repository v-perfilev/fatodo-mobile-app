import {AbstractAuditing} from './AbstractAuditing';
import {CommentDTO} from './dto/CommentDTO';
import {DateUtils} from '../shared/utils/DateUtils';

export const commentReactionTypes = ['LIKE', 'DISLIKE'];

export type CommentReactionType = 'LIKE' | 'DISLIKE' | 'NONE';

export interface CommentThreadInfo {
  targetId: string;
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
  date: DateUtils.getNowTime(),
});

export const buildCommentFromDTO = (dto: CommentDTO, targetId: string, userId: string): Comment => ({
  ...dto,
  id: '',
  parentId: undefined,
  targetId,
  userId,
  isDeleted: false,
  reactions: [],
  createdAt: DateUtils.getNowTime(),
  createdBy: userId,
});

export const buildCommentThreadInfo = (targetId: string): CommentThreadInfo => ({
  targetId,
  count: 0,
  unread: 0,
});

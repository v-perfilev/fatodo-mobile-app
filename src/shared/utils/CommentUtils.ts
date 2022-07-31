import {Comment, CommentThreadInfo, ReferenceComment} from '../../models/Comment';
import {User} from '../../models/User';
import {ArrayUtils} from './ArrayUtils';

export class CommentUtils {
  public static isOwnComment = (comment: Comment, account: User): boolean => {
    return comment && account && comment.userId === account.id;
  };

  public static extractUserFromComment = (users: Map<string, User>, comment: Comment | ReferenceComment): User => {
    return users.get(comment.userId);
  };

  public static extractUserIds = (comments: Comment[]): string[] => {
    const commentUserIds = comments.map((c) => c.userId);
    const referenceUserIds = comments.filter((c) => c.reference).map((r) => r.userId);
    const reactionUserIds = comments.flatMap((c) => c.reactions).map((r) => r.userId);
    return [...commentUserIds, ...referenceUserIds, ...reactionUserIds];
  };

  public static filterComments = (comments: Comment[]): Comment[] => {
    return comments.filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtComparator).reverse();
  };

  public static addInfo = (
    threadsInfo: [string, CommentThreadInfo][],
    newInfo: CommentThreadInfo[],
  ): [string, CommentThreadInfo][] => {
    const infoMap = new Map(threadsInfo);
    newInfo.forEach((i) => infoMap.set(i.targetId, i));
    return [...infoMap];
  };

  public static refreshInfo = (
    threadsInfo: [string, CommentThreadInfo][],
    targetId: string,
  ): [string, CommentThreadInfo][] => {
    const infoMap = new Map(threadsInfo);
    const info = infoMap.get(targetId);
    if (info) {
      info.unread = 0;
      infoMap.set(targetId, info);
    }
    return [...infoMap];
  };
}

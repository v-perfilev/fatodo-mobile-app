import {Comment, ReferenceComment} from '../../models/Comment';
import {User} from '../../models/User';
import {ArrayUtils} from './ArrayUtils';

export class CommentUtils {
  public static isOwnComment = (comment: Comment, account: User): boolean => {
    return comment && account && comment.userId === account.id;
  };

  public static extractUserFromComment = (users: User[], comment: Comment | ReferenceComment): User => {
    return users.find((user) => user.id === comment.userId);
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
}

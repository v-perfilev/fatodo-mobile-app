import {Comment} from '../../models/Comment';
import {User} from '../../models/User';

export class CommentUtils {
  public static isOwnComment = (comment: Comment, account: User): boolean => {
    return comment && account && comment.userId === account.id;
  };

  public static extractUserIds = (comments: Comment[]): string[] => {
    const commentUserIds = comments.map((c) => c.userId);
    const referenceUserIds = comments.filter((c) => c.reference).map((r) => r.userId);
    const reactionUserIds = comments.flatMap((c) => c.reactions).map((r) => r.userId);
    return [...commentUserIds, ...referenceUserIds, ...reactionUserIds];
  };
}

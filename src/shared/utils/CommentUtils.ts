import {Comment, ReferenceComment} from '../../models/Comment';
import {User} from '../../models/User';

export class CommentUtils {
  public static isOwnComment = (comment: Comment, account: User): boolean => {
    return comment && account && comment.userId === account.id;
  };

  public static extractUserFromComment = (users: User[], comment: Comment | ReferenceComment): User => {
    return users.find((user) => user.id === comment.userId);
  };

  public static extractUsernameFromComment = (users: User[], comment: Comment): string => {
    const user = users.find((user) => user.id === comment.userId);
    return user?.username || '';
  };
}

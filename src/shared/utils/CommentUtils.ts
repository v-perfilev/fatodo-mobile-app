import {Comment, CommentThreadInfo, ReferenceComment} from '../../models/Comment';
import {User} from '../../models/User';
import {FilterUtils} from './FilterUtils';
import {ComparatorUtils} from './ComparatorUtils';
import {Message} from '../../models/Message';
import {ArrayUtils} from './ArrayUtils';

export class CommentUtils {
  public static filterComments = (comments: Comment[]): Comment[] => {
    return comments.filter(FilterUtils.uniqueByIdFilter).sort(ComparatorUtils.createdAtComparator).reverse();
  };

  public static findComment = (comments: Comment[], c: Comment): Message => {
    return ArrayUtils.findValueWithId(comments, c) || ArrayUtils.findValueWithUserIdAndText(comments, c);
  };

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

  public static addInfo = (
    threadsInfo: [string, CommentThreadInfo][],
    newInfo: CommentThreadInfo[],
  ): [string, CommentThreadInfo][] => {
    const infoMap = new Map(threadsInfo);
    newInfo.forEach((i) => infoMap.set(i.targetId, i));
    return [...infoMap];
  };

  public static increaseInfo = (
    threadsInfo: [string, CommentThreadInfo][],
    targetId: string,
    isOwnComment: boolean,
  ): [string, CommentThreadInfo][] => {
    const infoMap = new Map(threadsInfo);
    if (infoMap.has(targetId)) {
      const threadInfo = infoMap.get(targetId);
      threadInfo.count = threadInfo.count + 1;
      threadInfo.unread = isOwnComment ? threadInfo.unread : threadInfo.unread + 1;
    }
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

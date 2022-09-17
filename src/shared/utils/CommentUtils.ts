import {Comment, CommentThreadInfo} from '../../models/Comment';
import {User} from '../../models/User';
import {FilterUtils} from './FilterUtils';
import {ComparatorUtils} from './ComparatorUtils';
import {Message} from '../../models/Message';
import {ArrayUtils} from './ArrayUtils';
import {StoreUtils} from './StoreUtils';

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
    newInfo.forEach((info) => {
      threadsInfo = StoreUtils.setValue(threadsInfo, info.targetId, info);
    });
    return threadsInfo;
  };

  public static increaseInfo = (
    threadsInfo: [string, CommentThreadInfo][],
    targetId: string,
  ): [string, CommentThreadInfo][] => {
    const info = StoreUtils.getValue(threadsInfo, targetId, undefined);
    if (info) {
      info.count = info.count + 1;
      info.unread = info.unread + 1;
      threadsInfo = StoreUtils.setValue(threadsInfo, targetId, info);
    }
    return threadsInfo;
  };

  public static refreshInfo = (
    threadsInfo: [string, CommentThreadInfo][],
    targetId: string,
  ): [string, CommentThreadInfo][] => {
    const info = StoreUtils.getValue(threadsInfo, targetId, undefined);
    if (info) {
      info.unread = 0;
      threadsInfo = StoreUtils.setValue(threadsInfo, targetId, info);
    }
    return threadsInfo;
  };
}

import {User} from '../../models/User';
import {Group} from '../../models/Group';
import {Item} from '../../models/Item';
import {ArrayUtils} from './ArrayUtils';

export class GroupUtils {
  public static canAdmin = (user: User, group: Group): boolean => {
    const member = group.members.find((m) => m.userId === user.id);
    return member && member.permission === 'ADMIN';
  };

  public static canEdit = (user: User, group: Group): boolean => {
    const member = group.members.find((m) => m.userId === user.id);
    return member && (member.permission === 'ADMIN' || member.permission === 'EDIT');
  };

  public static canLeave = (user: User, group: Group): boolean => {
    const member = group.members.find((m) => m.userId === user.id);
    const adminCount = group.members.filter((member) => member.permission === 'ADMIN').length;
    return member && (member.permission !== 'ADMIN' || adminCount > 1);
  };

  public static filterItems = (items: Item[]): Item[] => {
    return items
      .filter(ArrayUtils.withIdFilter)
      .filter(ArrayUtils.uniqueByIdFilter)
      .sort(ArrayUtils.createdAtDescComparator);
  };
}

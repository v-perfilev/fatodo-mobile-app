import {Chat} from '../../models/Chat';
import {User} from '../../models/User';

export class ChatUtils {
  public static getDirectChatUser = (chat: Chat, users: User[], account: User): User => {
    return chat.isDirect ? users.find((user) => chat.members.includes(user.id) && user.id !== account.id) : null;
  };

  public static getTitle = (chat: Chat, users: User[], account: User): string => {
    return chat.title
      ? chat.title
      : users
          .filter((user) => chat.members.includes(user.id) && user.id !== account.id)
          .map((user) => user.username)
          .join(', ');
  };
}
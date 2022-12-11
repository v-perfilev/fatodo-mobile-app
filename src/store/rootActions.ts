import {AppDispatch} from './store';
import {CalendarActions} from './calendar/calendarActions';
import {ChatActions} from './chat/chatActions';
import {ChatsActions} from './chats/chatsActions';
import {CommentsActions} from './comments/commentsActions';
import {EventsActions} from './events/eventsActions';
import {GroupActions} from './group/groupActions';
import {GroupsActions} from './groups/groupsActions';
import {ItemActions} from './item/itemActions';
import {ContactsActions} from './contacts/contactsActions';
import {UserActions} from './user/userActions';
import {AuthActions} from './auth/authActions';

export class RootActions {
  static afterRefreshState = () => (dispatch: AppDispatch) => {
    dispatch(CalendarActions.afterRefresh());
    dispatch(ChatActions.afterRefresh());
    dispatch(ChatsActions.afterRefresh());
    dispatch(CommentsActions.afterRefresh());
    dispatch(EventsActions.afterRefresh());
    dispatch(GroupActions.afterRefresh());
    dispatch(GroupsActions.afterRefresh());
    dispatch(ItemActions.afterRefresh());
  };

  static afterLogoutState = () => (dispatch: AppDispatch) => {
    dispatch(AuthActions.afterLogout());
    dispatch(CalendarActions.afterLogout());
    dispatch(ChatActions.afterLogout());
    dispatch(ChatsActions.afterLogout());
    dispatch(CommentsActions.afterLogout());
    dispatch(ContactsActions.afterLogout());
    dispatch(EventsActions.afterLogout());
    dispatch(GroupActions.afterLogout());
    dispatch(GroupsActions.afterLogout());
    dispatch(ItemActions.afterLogout());
    dispatch(UserActions.afterLogout());
  };
}

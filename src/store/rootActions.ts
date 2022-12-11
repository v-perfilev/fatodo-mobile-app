import {AppDispatch} from './store';
import {CalendarActions} from './calendar/calendarActions';
import {ChatActions} from './chat/chatActions';
import {ChatsActions} from './chats/chatsActions';
import {CommentsActions} from './comments/commentsActions';
import {EventsActions} from './events/eventsActions';
import {GroupActions} from './group/groupActions';
import {GroupsActions} from './groups/groupsActions';
import {ItemActions} from './item/itemActions';

export class RootActions {
  static resetState = () => (dispatch: AppDispatch) => {
    dispatch(CalendarActions.reset());
    dispatch(ChatActions.reset());
    dispatch(ChatsActions.reset());
    dispatch(CommentsActions.reset());
    dispatch(EventsActions.reset());
    dispatch(GroupActions.reset());
    dispatch(GroupsActions.reset());
    dispatch(ItemActions.reset());
  };
}

import {AppDispatch} from './store';
import calendarSlice from './calendar/calendarSlice';
import chatSlice from './chat/chatSlice';
import chatsSlice from './chats/chatsSlice';
import commentsSlice from './comments/commentsSlice';
import contactsSlice from './contacts/contactsSlice';
import eventsSlice from './events/eventsSlice';
import groupSlice from './group/groupSlice';
import groupsSlice from './groups/groupsSlice';
import itemSlice from './item/itemSlice';
import userSlice from './user/userSlice';

export class RootActions {
  static resetState = () => (dispatch: AppDispatch) => {
    // all stores except of authStore and infoStore
    dispatch(calendarSlice.actions.reset());
    dispatch(chatSlice.actions.reset());
    dispatch(chatsSlice.actions.reset());
    dispatch(commentsSlice.actions.reset());
    dispatch(contactsSlice.actions.reset());
    dispatch(eventsSlice.actions.reset());
    dispatch(groupSlice.actions.reset());
    dispatch(groupsSlice.actions.reset());
    dispatch(itemSlice.actions.reset());
    dispatch(userSlice.actions.reset());
  };
}

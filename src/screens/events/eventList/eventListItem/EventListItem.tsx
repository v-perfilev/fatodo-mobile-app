import React, {memo, ReactElement, useMemo} from 'react';
import {Event, EventType} from '../../../../models/Event';
import EventWelcome from './EventWelcome';
import EventContactSend from './EventContactSend';
import EventContactAccept from './EventContactAccept';
import EventItemCreate from './EventItemCreate';
import EventItemUpdate from './EventItemUpdate';
import EventItemGroupCreate from './EventItemGroupCreate';
import EventItemGroupUpdate from './EventItemGroupUpdate';
import EventItemMemberAdd from './EventItemMemberAdd';
import EventItemMemberDelete from './EventItemMemberDelete';
import EventItemMemberLeave from './EventItemMemberLeave';
import EventItemMemberRole from './EventItemMemberRole';
import EventCommentAdd from './EventCommentAdd';
import EventCommentReaction from './EventCommentReaction';
import EventChatCreate from './EventChatCreate';
import EventChatUpdate from './EventChatUpdate';
import EventChatMemberAdd from './EventChatMemberAdd';
import EventChatMemberDelete from './EventChatMemberDelete';
import EventChatMemberLeave from './EventChatMemberLeave';
import EventChatReaction from './EventChatReaction';
import EventReminder from './EventReminder';

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({event}: EventListItemProps) => {
  const eventElement = useMemo<ReactElement>(() => {
    switch (event.type) {
      // ACCOUNT
      case EventType.WELCOME:
        return <EventWelcome />;

      // CONTACT
      case EventType.CONTACT_SEND:
        return <EventContactSend event={event} />;
      case EventType.CONTACT_ACCEPT:
        return <EventContactAccept event={event} />;

      // ITEM
      case EventType.ITEM_CREATE:
        return <EventItemCreate event={event} />;
      case EventType.ITEM_UPDATE:
        return <EventItemUpdate event={event} />;
      case EventType.ITEM_GROUP_CREATE:
        return <EventItemGroupCreate event={event} />;
      case EventType.ITEM_GROUP_UPDATE:
        return <EventItemGroupUpdate event={event} />;
      case EventType.ITEM_MEMBER_ADD:
        return <EventItemMemberAdd event={event} />;
      case EventType.ITEM_MEMBER_DELETE:
        return <EventItemMemberDelete event={event} />;
      case EventType.ITEM_MEMBER_LEAVE:
        return <EventItemMemberLeave event={event} />;
      case EventType.ITEM_MEMBER_ROLE:
        return <EventItemMemberRole event={event} />;

      // COMMENT
      case EventType.COMMENT_ADD:
        return <EventCommentAdd event={event} />;
      case EventType.COMMENT_REACTION:
        return <EventCommentReaction event={event} />;

      // CHAT
      case EventType.CHAT_CREATE:
        return <EventChatCreate event={event} />;
      case EventType.CHAT_UPDATE:
        return <EventChatUpdate event={event} />;
      case EventType.CHAT_MEMBER_ADD:
        return <EventChatMemberAdd event={event} />;
      case EventType.CHAT_MEMBER_DELETE:
        return <EventChatMemberDelete event={event} />;
      case EventType.CHAT_MEMBER_LEAVE:
        return <EventChatMemberLeave event={event} />;
      case EventType.CHAT_REACTION:
        return <EventChatReaction event={event} />;

      // REMINDER
      case EventType.REMINDER:
        return <EventReminder event={event} />;
    }
  }, [event]);

  return <>{eventElement}</>;
};

export default memo(EventListItem);

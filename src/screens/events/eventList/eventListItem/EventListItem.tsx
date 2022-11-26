import React, {memo, ReactElement, useMemo} from 'react';
import {Event, EventType} from '../../../../models/Event';
import EventWelcome from './default/EventWelcome';
import EventContactSend from './contact/EventContactSend';
import EventContactAccept from './contact/EventContactAccept';
import EventItemCreate from './item/EventItemCreate';
import EventItemUpdate from './item/EventItemUpdate';
import EventItemGroupCreate from './item/EventItemGroupCreate';
import EventItemGroupUpdate from './item/EventItemGroupUpdate';
import EventItemMemberAdd from './item/EventItemMemberAdd';
import EventItemMemberDelete from './item/EventItemMemberDelete';
import EventItemMemberLeave from './item/EventItemMemberLeave';
import EventItemMemberRole from './item/EventItemMemberRole';
import EventCommentAdd from './comment/EventCommentAdd';
import EventCommentReaction from './comment/EventCommentReaction';
import EventChatCreate from './chat/EventChatCreate';
import EventChatUpdate from './chat/EventChatUpdate';
import EventChatMemberAdd from './chat/EventChatMemberAdd';
import EventChatMemberDelete from './chat/EventChatMemberDelete';
import EventChatMemberLeave from './chat/EventChatMemberLeave';
import EventChatReaction from './chat/EventChatReaction';
import EventReminder from './reminder/EventReminder';

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({event}: EventListItemProps) => {
  const eventElement = useMemo<ReactElement>(() => {
    switch (event.type) {
      // ACCOUNT
      case EventType.WELCOME:
        return <EventWelcome event={event} />;

      // CONTACT
      case EventType.CONTACT_REQUEST:
      case EventType.CONTACT_REQUEST_INCOMING:
      case EventType.CONTACT_REQUEST_OUTCOMING:
        return <EventContactSend event={event} />;
      case EventType.CONTACT_ACCEPT:
      case EventType.CONTACT_ACCEPT_INCOMING:
      case EventType.CONTACT_ACCEPT_OUTCOMING:
        return <EventContactAccept event={event} />;

      // ITEM
      case EventType.ITEM_CREATE:
        return <EventItemCreate event={event} />;
      case EventType.ITEM_UPDATE:
      case EventType.ITEM_UPDATE_STATUS:
      case EventType.ITEM_UPDATE_ARCHIVED:
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
      case EventType.COMMENT_CREATE:
        return <EventCommentAdd event={event} />;
      case EventType.COMMENT_REACTION_INCOMING:
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
      case EventType.CHAT_REACTION_INCOMING:
        return <EventChatReaction event={event} />;

      // REMINDER
      case EventType.REMINDER:
        return <EventReminder event={event} />;
    }
  }, [event]);

  return <>{eventElement}</>;
};

export default memo(EventListItem);

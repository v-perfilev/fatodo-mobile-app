import React, {memo, ReactElement, useMemo} from 'react';
import {Event, EventType} from '../../models/Event';
import NotificationContactSend from './notificationItems/contact/NotificationContactSend';
import NotificationContactAccept from './notificationItems/contact/NotificationContactAccept';
import NotificationItemCreate from './notificationItems/item/NotificationItemCreate';
import NotificationItemMemberAdd from './notificationItems/item/NotificationItemMemberAdd';
import NotificationCommentAdd from './notificationItems/comment/NotificationCommentAdd';
import NotificationCommentReaction from './notificationItems/comment/NotificationCommentReaction';
import NotificationChatCreate from './notificationItems/chat/NotificationChatCreate';
import NotificationChatMemberAdd from './notificationItems/chat/NotificationChatMemberAdd';
import NotificationChatReaction from './notificationItems/chat/NotificationChatReaction';
import NotificationReminder from './notificationItems/reminder/NotificationReminder';
import NotificationChatMessageCreate from './notificationItems/chat/NotificationChatMessageCreate';

type NotificationItemProps = {
  event: Event;
};

const NotificationItem = ({event}: NotificationItemProps) => {
  const eventElement = useMemo<ReactElement>(() => {
    switch (event?.type) {
      // CONTACT
      case EventType.CONTACT_REQUEST_INCOMING:
        return <NotificationContactSend event={event} />;
      case EventType.CONTACT_ACCEPT_INCOMING:
        return <NotificationContactAccept event={event} />;

      // ITEM
      case EventType.ITEM_CREATE:
        return <NotificationItemCreate event={event} />;
      case EventType.ITEM_MEMBER_ADD:
        return <NotificationItemMemberAdd event={event} />;

      // COMMENT
      case EventType.COMMENT_CREATE:
        return <NotificationCommentAdd event={event} />;
      case EventType.COMMENT_REACTION_INCOMING:
        return <NotificationCommentReaction event={event} />;

      // CHAT
      case EventType.CHAT_CREATE:
        return <NotificationChatCreate event={event} />;
      case EventType.CHAT_MEMBER_ADD:
        return <NotificationChatMemberAdd event={event} />;
      case EventType.CHAT_MESSAGE_CREATE:
        return <NotificationChatMessageCreate event={event} />;
      case EventType.CHAT_REACTION_INCOMING:
        return <NotificationChatReaction event={event} />;

      // REMINDER
      case EventType.REMINDER:
        return <NotificationReminder event={event} />;
    }
  }, [event]);

  return <>{eventElement}</>;
};

export default memo(NotificationItem);

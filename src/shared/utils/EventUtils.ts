import {ChatEvent, CommentEvent, ContactEvent, Event, ItemEvent, ReminderEvent} from '../../models/Event';

export class EventUtils {
  public static extractEventsUserIds = (events: Event[]): string[] => {
    return events.flatMap(EventUtils.extractEventUserIds);
  };

  public static extractEventsGroupIds = (events: Event[]): string[] => {
    return events.flatMap(EventUtils.extractEventGroupIds);
  };

  public static extractEventsItemIds = (events: Event[]): string[] => {
    return events.flatMap(EventUtils.extractEventItemIds);
  };

  public static extractEventsChatIds = (events: Event[]): string[] => {
    return events.flatMap(EventUtils.extractEventChatIds);
  };

  public static extractEventsMessageIds = (events: Event[]): string[] => {
    return events.flatMap(EventUtils.extractEventMessageIds);
  };

  public static extractEventsCommentIds = (events: Event[]): string[] => {
    return events.flatMap(EventUtils.extractEventCommentIds);
  };

  private static extractEventUserIds = (event: Event): string[] => {
    let userIds: string[] = [];

    if (event.contactEvent) {
      userIds = EventUtils.extractContactEventUserIds(event.contactEvent);
    } else if (event.itemEvent) {
      userIds = EventUtils.extractItemEventUserIds(event.itemEvent);
    } else if (event.commentEvent) {
      userIds = EventUtils.extractCommentEventUserIds(event.commentEvent);
    } else if (event.chatEvent) {
      userIds = EventUtils.extractChatEventUserIds(event.chatEvent);
    }

    return userIds;
  };

  private static extractEventGroupIds = (event: Event): string[] => {
    let groupIds: string[] = [];
    if (event.itemEvent) {
      groupIds = EventUtils.extractItemEventGroupIds(event.itemEvent);
    } else if (event.commentEvent) {
      groupIds = EventUtils.extractCommentEventGroupIds(event.commentEvent);
    } else if (event.reminderEvent) {
      groupIds = EventUtils.extractReminderEventGroupIds(event.reminderEvent);
    }
    return groupIds;
  };

  private static extractEventItemIds = (event: Event): string[] => {
    let itemIds: string[] = [];
    if (event.itemEvent) {
      itemIds = EventUtils.extractItemEventItemIds(event.itemEvent);
    } else if (event.commentEvent) {
      itemIds = EventUtils.extractCommentEventItemIds(event.commentEvent);
    } else if (event.reminderEvent) {
      itemIds = EventUtils.extractReminderEventItemIds(event.reminderEvent);
    }
    return itemIds;
  };

  private static extractEventChatIds = (event: Event): string[] => {
    let chatIds: string[] = [];
    if (event.chatEvent) {
      chatIds = EventUtils.extractChatEventChatIds(event.chatEvent);
    }
    return chatIds;
  };

  private static extractEventMessageIds = (event: Event): string[] => {
    let messageIds: string[] = [];
    if (event.chatEvent) {
      messageIds = EventUtils.extractChatEventMessageIds(event.chatEvent);
    }
    return messageIds;
  };

  private static extractEventCommentIds = (event: Event): string[] => {
    let messageIds: string[] = [];
    if (event.commentEvent) {
      messageIds = EventUtils.extractChatEventCommentIds(event.commentEvent);
    }
    return messageIds;
  };

  private static extractContactEventUserIds = (contactEvent: ContactEvent): string[] => {
    return [contactEvent.firstUserId, contactEvent.secondUserId];
  };

  private static extractItemEventUserIds = (itemEvent: ItemEvent): string[] => {
    const userIds = [itemEvent.userId];
    itemEvent.userIds && userIds.push(...itemEvent.userIds);
    return userIds;
  };

  private static extractCommentEventUserIds = (commentEvent: CommentEvent): string[] => {
    return [commentEvent.userId];
  };

  private static extractChatEventUserIds = (chatEvent: ChatEvent): string[] => {
    const userIds = [chatEvent.userId];
    chatEvent.userIds && userIds.push(...chatEvent.userIds);
    return userIds;
  };

  private static extractItemEventGroupIds(itemEvent: ItemEvent) {
    return [itemEvent.groupId];
  }

  private static extractCommentEventGroupIds(commentEvent: CommentEvent) {
    return commentEvent.parentId !== commentEvent.targetId ? [commentEvent.parentId] : [];
  }

  private static extractReminderEventGroupIds(reminderEvent: ReminderEvent) {
    return [reminderEvent.groupId];
  }

  private static extractItemEventItemIds(itemEvent: ItemEvent) {
    return [itemEvent.itemId];
  }

  private static extractCommentEventItemIds(commentEvent: CommentEvent) {
    return commentEvent.parentId !== commentEvent.targetId ? [commentEvent.targetId] : [];
  }

  private static extractReminderEventItemIds(reminderEvent: ReminderEvent) {
    return [reminderEvent.itemId];
  }

  private static extractChatEventChatIds(chatEvent: ChatEvent) {
    return [chatEvent.chatId];
  }

  private static extractChatEventMessageIds(chatEvent: ChatEvent) {
    return [chatEvent.messageId];
  }

  private static extractChatEventCommentIds(commentEvent: CommentEvent) {
    return [commentEvent.commentId];
  }
}

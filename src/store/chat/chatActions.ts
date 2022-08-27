import chatSlice from './chatSlice';
import {Chat} from '../../models/Chat';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import {MessageDTO} from '../../models/dto/MessageDTO';
import {UserAccount} from '../../models/User';
import {buildMessageFromDTO, Message, MessageReaction, MessageStatus} from '../../models/Message';
import snackSlice from '../snack/snackSlice';
import chatsSlice from '../chats/chatsSlice';
import {AppDispatch, RootState} from '../store';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {MessageUtils} from '../../shared/utils/MessageUtils';
import {InfoActions} from '../info/infoActions';

const PREFIX = 'chat/';

export class ChatActions {
  static addMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.addMessage(message));
  };

  static updateMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateMessage(message));
  };

  static updateMessageReactions = (messageReaction: MessageReaction) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateMessageReactions(messageReaction));
  };

  static updateMessageStatuses = (messageStatus: MessageStatus) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.updateMessageStatuses(messageStatus));
  };

  static selectChatThunk = createAsyncThunk(PREFIX + 'selectChat', async (chat: Chat, thunkAPI) => {
    await thunkAPI.dispatch(chatSlice.actions.selectChat(chat));
    await thunkAPI.dispatch(ChatActions.fetchMessagesThunk({chatId: chat.id, offset: 0}));
  });

  static fetchChatThunk = createAsyncThunk(PREFIX + 'fetchChat', async (chatId: string, thunkAPI) => {
    const result = await ChatService.getChatById(chatId);
    const chatUserIds = ChatUtils.extractUserIds([result.data]);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
    await thunkAPI.dispatch(ChatActions.fetchMessagesThunk({chatId: result.data.id, offset: 0}));
    return result.data;
  });

  static fetchMessagesThunk = createAsyncThunk(
    PREFIX + 'fetchMessages',
    async ({chatId, offset}: {chatId: string; offset: number}, thunkAPI) => {
      const result = await ChatService.getAllMessagesByChatIdPageable(chatId, offset);
      const messages = result.data.data;
      const messageUserIds = MessageUtils.extractUserIds(messages);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(messageUserIds));
      return result.data;
    },
  );

  static refreshMessagesThunk = createAsyncThunk(PREFIX + 'refreshMessages', async (chatId: string, thunkAPI) => {
    thunkAPI.dispatch(ChatActions.fetchMessagesThunk({chatId, offset: 0}));
  });

  static markMessageAsReadThunk = createAsyncThunk(
    PREFIX + 'markAsRead',
    async ({chatId, messageId, account}: {chatId: string; messageId: string; account: UserAccount}, thunkAPI) => {
      ChatService.markMessageAsRead(messageId);
      thunkAPI.dispatch(chatsSlice.actions.removeUnread({chatId, messageId}));
      thunkAPI.dispatch(chatSlice.actions.markMessageAsRead({messageId, account}));
    },
  );

  static noReactionThunk = createAsyncThunk(
    PREFIX + 'noReaction',
    async ({message, account}: {message: Message; account: UserAccount}, thunkAPI) => {
      ChatService.noneMessageReaction(message.id);
      thunkAPI.dispatch(chatSlice.actions.deleteMessageReaction({message, account}));
    },
  );

  static likeReactionThunk = createAsyncThunk(
    PREFIX + 'likeReaction',
    async ({message, account}: {message: Message; account: UserAccount}, thunkAPI) => {
      ChatService.likeMessageReaction(message.id);
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({message, reactionType: 'LIKE', account}));
    },
  );

  static dislikeReactionThunk = createAsyncThunk(
    PREFIX + 'dislikeReaction',
    async ({message, account}: {message: Message; account: UserAccount}, thunkAPI) => {
      ChatService.dislikeMessageReaction(message.id);
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction({message, reactionType: 'DISLIKE', account}));
    },
  );

  static renameChatThunk = createAsyncThunk(
    PREFIX + 'renameChat',
    async ({chat, title}: {chat: Chat; title: string}, thunkAPI) => {
      const result = await ChatService.renameChat(chat.id, title);
      thunkAPI.dispatch(chatsSlice.actions.updateChat(result.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.renamed', variant: 'info'}));
    },
  );

  static clearChatThunk = createAsyncThunk(PREFIX + 'clearChat', async (chat: Chat, thunkAPI) => {
    await ChatService.clearChat(chat.id);
    thunkAPI.dispatch(chatsSlice.actions.clearChat(chat.id));
    thunkAPI.dispatch(chatSlice.actions.clearChat());
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.cleared', variant: 'info'}));
  });

  static leaveChatThunk = createAsyncThunk(PREFIX + 'leaveChat', async (chat: Chat, thunkAPI) => {
    await ChatService.leaveChat(chat.id);
    thunkAPI.dispatch(chatsSlice.actions.removeChat(chat.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.left', variant: 'info'}));
  });

  static deleteChatThunk = createAsyncThunk(PREFIX + 'deleteChat', async (chat: Chat, thunkAPI) => {
    await ChatService.deleteChat(chat.id);
    thunkAPI.dispatch(chatsSlice.actions.removeChat(chat.id));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.deleted', variant: 'info'}));
  });

  static addChatMembersThunk = createAsyncThunk(
    PREFIX + 'addChatMembers',
    async ({chat, userIds}: {chat: Chat; userIds: string[]}, thunkAPI) => {
      const newMembers = userIds.map((userId) => ({chatId: chat.id, userId}));
      const updatedMembers = [...chat.members, ...newMembers];
      const updatedChat = {...chat, members: updatedMembers};
      await ChatService.addUsersToChat(chat.id, userIds);
      thunkAPI.dispatch(chatsSlice.actions.updateChat(updatedChat));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.edited', variant: 'info'}));
    },
  );

  static removeChatMemberThunk = createAsyncThunk(
    PREFIX + 'removeChatMember',
    async ({chat, userId}: {chat: Chat; userId: string}, thunkAPI) => {
      const updatedMembers = ArrayUtils.deleteValue(chat.members, userId);
      const updatedChat = {...chat, members: updatedMembers};
      await ChatService.removeUsersFromChat(chat.id, [userId]);
      thunkAPI.dispatch(chatsSlice.actions.updateChat(updatedChat));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.edited', variant: 'info'}));
    },
  );

  static sendMessageThunk = createAsyncThunk(
    PREFIX + 'sendMessage',
    async ({chatId, dto}: {chatId: string; dto: MessageDTO}, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const userId = state.auth.account.id;
      const message = buildMessageFromDTO(dto, chatId, userId);
      thunkAPI.dispatch(chatSlice.actions.addMessage(message));
      const result = await ChatService.sendIndirectMessage(chatId, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastMessage(result.data));
    },
  );

  static editMessageThunk = createAsyncThunk(
    PREFIX + 'editMessage',
    async ({message, dto}: {message: Message; dto: MessageDTO}, thunkAPI) => {
      const result = await ChatService.editMessage(message.id, dto);
      thunkAPI.dispatch(chatsSlice.actions.updateLastMessage(result.data));
      thunkAPI.dispatch(chatSlice.actions.updateMessage(result.data));
      thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.messageEdited', variant: 'info'}));
    },
  );

  static deleteMessageThunk = createAsyncThunk(PREFIX + 'deleteMessage', async (message: Message, thunkAPI) => {
    ChatService.deleteMessage(message.id);
    const updatedMessage = {...message, isDeleted: true} as Message;
    thunkAPI.dispatch(chatsSlice.actions.updateLastMessage(updatedMessage));
    thunkAPI.dispatch(chatSlice.actions.updateMessage(updatedMessage));
    thunkAPI.dispatch(snackSlice.actions.handleCode({code: 'chat.messageDeleted', variant: 'info'}));
  });
}

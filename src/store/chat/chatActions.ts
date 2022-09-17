import chatSlice from './chatSlice';
import {Chat} from '../../models/Chat';
import ChatService from '../../services/ChatService';
import {MessageDTO} from '../../models/dto/MessageDTO';
import {UserAccount} from '../../models/User';
import {
  buildEventMessage,
  buildMessageFromDTO,
  buildMessageReaction,
  buildMessageStatus,
  EventMessageType,
  Message,
  MessageReaction,
  MessageStatus,
} from '../../models/Message';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {ChatUtils} from '../../shared/utils/ChatUtils';
import {MessageUtils} from '../../shared/utils/MessageUtils';
import {InfoActions} from '../info/infoActions';
import {SnackActions} from '../snack/snackActions';
import {ChatsActions} from '../chats/chatsActions';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {PageableList} from '../../models/PageableList';

const PREFIX = 'chat/';

export class ChatActions {
  static addMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessages([message]));
  };

  static updateMessage = (message: Message) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessages([message]));
  };

  static setMessageReaction = (messageReaction: MessageReaction) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessageReaction(messageReaction));
  };

  static setMessageStatus = (messageStatus: MessageStatus) => async (dispatch: AppDispatch) => {
    dispatch(chatSlice.actions.setMessageStatus(messageStatus));
  };

  static selectChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'selectChat',
    async (chat, thunkAPI) => {
      await thunkAPI.dispatch(chatSlice.actions.setChat(chat));
      await thunkAPI.dispatch(ChatActions.fetchMessagesThunk({chatId: chat.id, offset: 0}));
    },
  );

  static fetchChatThunk = createAsyncThunk<Chat, string, AsyncThunkConfig>(
    PREFIX + 'fetchChat',
    async (chatId, thunkAPI) => {
      const result = await ChatService.getChatById(chatId);
      const chatUserIds = ChatUtils.extractUserIds([result.data]);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(chatUserIds));
      await thunkAPI.dispatch(ChatActions.fetchMessagesThunk({chatId: result.data.id, offset: 0}));
      return result.data;
    },
  );

  static fetchMessagesThunk = createAsyncThunk<
    PageableList<Message>,
    {chatId: string; offset: number},
    AsyncThunkConfig
  >(PREFIX + 'fetchMessages', async ({chatId, offset}, thunkAPI) => {
    const result = await ChatService.getAllMessagesByChatIdPageable(chatId, offset);
    const messages = result.data.data;
    const messageUserIds = MessageUtils.extractUserIds(messages);
    thunkAPI.dispatch(InfoActions.handleUserIdsThunk(messageUserIds));
    return result.data;
  });

  static refreshMessagesThunk = createAsyncThunk<PageableList<Message>, string>(
    PREFIX + 'refreshMessages',
    async (chatId, thunkAPI) => {
      const result = await ChatService.getAllMessagesByChatIdPageable(chatId);
      const messages = result.data.data;
      const messageUserIds = MessageUtils.extractUserIds(messages);
      thunkAPI.dispatch(InfoActions.handleUserIdsThunk(messageUserIds));
      return result.data;
    },
  );

  static markMessageAsReadThunk = createAsyncThunk<void, {message: Message; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'markAsRead',
    async ({message, account}, thunkAPI) => {
      const status = buildMessageStatus(message.chatId, message.id, account.id, 'READ');
      thunkAPI.dispatch(chatSlice.actions.setMessageStatus(status));
      thunkAPI.dispatch(ChatsActions.removeUnreadMessage(message));
      ChatService.markMessageAsRead(message.id);
    },
  );

  static noReactionThunk = createAsyncThunk<void, {message: Message; account: UserAccount}>(
    PREFIX + 'noReaction',
    async ({message, account}, thunkAPI) => {
      const reaction = buildMessageReaction(message.chatId, message.id, account.id, 'NONE');
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction(reaction));
      ChatService.noneMessageReaction(message.id);
    },
  );

  static likeReactionThunk = createAsyncThunk<void, {message: Message; account: UserAccount}>(
    PREFIX + 'likeReaction',
    async ({message, account}, thunkAPI) => {
      const reaction = buildMessageReaction(message.chatId, message.id, account.id, 'LIKE');
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction(reaction));
      ChatService.likeMessageReaction(message.id);
    },
  );

  static dislikeReactionThunk = createAsyncThunk<void, {message: Message; account: UserAccount}, AsyncThunkConfig>(
    PREFIX + 'dislikeReaction',
    async ({message, account}, thunkAPI) => {
      const reaction = buildMessageReaction(message.chatId, message.id, account.id, 'DISLIKE');
      thunkAPI.dispatch(chatSlice.actions.setMessageReaction(reaction));
      ChatService.dislikeMessageReaction(message.id);
    },
  );

  static renameChatThunk = createAsyncThunk<void, {chat: Chat; title: string}, AsyncThunkConfig>(
    PREFIX + 'renameChat',
    async ({chat, title}, thunkAPI) => {
      await ChatService.renameChat(chat.id, title);
      thunkAPI.dispatch(SnackActions.handleCode('chat.renamed', 'info'));
    },
  );

  static clearChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'clearChat',
    async (chat, thunkAPI) => {
      await ChatService.clearChat(chat.id);
      const message = buildEventMessage(chat.id, undefined, EventMessageType.CLEAR_CHAT, undefined);
      thunkAPI.dispatch(chatSlice.actions.resetMessages());
      thunkAPI.dispatch(chatSlice.actions.setMessages([message]));
      thunkAPI.dispatch(ChatsActions.setChatLastMessageAction(message));
      thunkAPI.dispatch(ChatsActions.removeUnreadChat(message.chatId));
      thunkAPI.dispatch(SnackActions.handleCode('chat.cleared', 'info'));
    },
  );

  static leaveChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'leaveChat',
    async (chat, thunkAPI) => {
      await ChatService.leaveChat(chat.id);
      thunkAPI.dispatch(ChatsActions.removeChat(chat.id));
      thunkAPI.dispatch(SnackActions.handleCode('chat.left', 'info'));
    },
  );

  static deleteChatThunk = createAsyncThunk<void, Chat, AsyncThunkConfig>(
    PREFIX + 'deleteChat',
    async (chat, thunkAPI) => {
      await ChatService.deleteChat(chat.id);
      thunkAPI.dispatch(ChatsActions.removeChat(chat.id));
      thunkAPI.dispatch(SnackActions.handleCode('chat.deleted', 'info'));
    },
  );

  static addChatMembersThunk = createAsyncThunk<void, {chat: Chat; userIds: string[]}, AsyncThunkConfig>(
    PREFIX + 'addChatMembers',
    async ({chat, userIds}, thunkAPI) => {
      await ChatService.addUsersToChat(chat.id, userIds);
      thunkAPI.dispatch(SnackActions.handleCode('chat.edited', 'info'));
    },
  );

  static removeChatMemberThunk = createAsyncThunk<void, {chat: Chat; userId: string}, AsyncThunkConfig>(
    PREFIX + 'removeChatMember',
    async ({chat, userId}, thunkAPI) => {
      await ChatService.removeUsersFromChat(chat.id, [userId]);
      thunkAPI.dispatch(SnackActions.handleCode('chat.edited', 'info'));
    },
  );

  static sendMessageThunk = createAsyncThunk<void, {chatId: string; dto: MessageDTO}, AsyncThunkConfig>(
    PREFIX + 'sendMessage',
    async ({chatId, dto}, thunkAPI) => {
      const userId = thunkAPI.getState().auth.account.id;
      const message = buildMessageFromDTO(dto, chatId, userId);
      thunkAPI.dispatch(chatSlice.actions.setMessages([message]));
      ChatService.sendIndirectMessage(chatId, dto);
    },
  );

  static editMessageThunk = createAsyncThunk<void, {message: Message; dto: MessageDTO}, AsyncThunkConfig>(
    PREFIX + 'editMessage',
    async ({message, dto}, thunkAPI) => {
      const editedMessage = {...message, ...dto} as Message;
      thunkAPI.dispatch(ChatActions.updateMessage(editedMessage));
      await ChatService.editMessage(message.id, dto);
      thunkAPI.dispatch(SnackActions.handleCode('chat.messageEdited', 'info'));
    },
  );

  static deleteMessageThunk = createAsyncThunk<void, Message, AsyncThunkConfig>(
    PREFIX + 'deleteMessage',
    async (message, thunkAPI) => {
      const deletedMessage = {...message, isDeleted: true} as Message;
      thunkAPI.dispatch(chatSlice.actions.setMessages([deletedMessage]));
      await ChatService.deleteMessage(message.id);
      thunkAPI.dispatch(SnackActions.handleCode('chat.messageDeleted', 'info'));
    },
  );
}

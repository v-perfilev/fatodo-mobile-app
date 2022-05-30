import {AxiosPromise} from 'axios';
import {Chat} from '../models/Chat';
import {Message} from '../models/Message';
import {MessageDTO} from '../models/dto/MessageDTO';
import axios, {axiosIgnore404} from '../shared/axios';

export default class ChatService {
  private static baseUrl = '/api/chat';

  /*
    ChatController
   */
  public static getAllChatsPageable = (offset?: number, size?: number): AxiosPromise<Chat[]> => {
    const url = ChatService.baseUrl + '/chats';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getFilteredChats = (filter: string): AxiosPromise<Chat[]> => {
    const url = ChatService.baseUrl + '/chats/filtered/' + filter;
    return axiosIgnore404.get(url);
  };

  public static getChatById = (id: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chats/id/' + id;
    return axios.get(url);
  };

  public static createDirectChat = (userId: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chats/create-direct/' + userId;
    return axios.get(url);
  };

  public static createIndirectChat = (userIds: string[]): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chats/create-indirect';
    return axios.post(url, userIds);
  };

  public static renameChat = (id: string, title: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chats/rename/' + id;
    return axios.post(url, title);
  };

  public static getUnreadMessagesMap = (): AxiosPromise<Map<string, string[]>> => {
    const url = ChatService.baseUrl + '/chats/unread-messages-map';
    return axios.get(url);
  };

  /*
    MemberController
   */
  public static addUsersToChat = (chatId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/members/add/' + chatId;
    return axios.post(url, userIds);
  };

  public static removeUsersFromChat = (chatId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/members/remove/' + chatId;
    return axios.post(url, userIds);
  };

  public static leaveChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/members/leave/' + chatId;
    return axios.get(url);
  };

  public static clearChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/members/clear/' + chatId;
    return axios.get(url);
  };

  public static deleteChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/members/delete/' + chatId;
    return axios.get(url);
  };

  /*
    MessageController
   */
  public static getAllMessagesByChatIdPageable = (
    chatId: string,
    offset?: number,
    size?: number,
  ): AxiosPromise<Message[]> => {
    const url = ChatService.baseUrl + '/messages/' + chatId;
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static sendDirectMessage = (userId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/messages/direct/' + userId;
    return axios.post(url, dto);
  };

  public static sendIndirectMessage = (chatId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/messages/' + chatId;
    return axios.post(url, dto);
  };

  public static editMessage = (messageId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/messages/' + messageId;
    return axios.put(url, dto);
  };

  public static deleteMessage = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/messages/' + messageId;
    return axios.delete(url);
  };

  /*
    ReactionController
   */
  public static likeMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reactions/like/' + messageId;
    return axios.get(url);
  };

  public static dislikeMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reactions/dislike/' + messageId;
    return axios.get(url);
  };

  public static noneMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reactions/none/' + messageId;
    return axios.get(url);
  };

  /*
    StatusController
   */
  public static markMessageAsRead = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/statuses/read/' + messageId;
    return axios.get(url);
  };
}

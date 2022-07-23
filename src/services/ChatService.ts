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
    const url = ChatService.baseUrl + '/chat';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getFilteredChats = (filter: string): AxiosPromise<Chat[]> => {
    const url = ChatService.baseUrl + '/chat/filter/' + filter;
    return axiosIgnore404.get(url);
  };

  public static getChatById = (id: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/' + id;
    return axios.get(url);
  };

  public static createDirectChat = (userId: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/direct';
    return axios.post(url, userId);
  };

  public static createIndirectChat = (userIds: string[]): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/indirect';
    return axios.post(url, userIds);
  };

  public static renameChat = (id: string, title: string): AxiosPromise<Chat> => {
    const url = ChatService.baseUrl + '/chat/' + id;
    return axios.put(url, title);
  };

  public static getUnreadMessagesMap = (): AxiosPromise<Map<string, string[]>> => {
    const url = ChatService.baseUrl + '/chat/unread';
    return axios.get(url);
  };

  /*
    MemberController
   */
  public static addUsersToChat = (chatId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/' + chatId;
    return axios.post(url, userIds);
  };

  public static removeUsersFromChat = (chatId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/' + chatId;
    const params = {ids: userIds};
    return axios.delete(url, {params});
  };

  public static leaveChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/' + chatId + '/leave';
    return axios.delete(url);
  };

  public static clearChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/' + chatId + '/clear';
    return axios.delete(url);
  };

  public static deleteChat = (chatId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/member/' + chatId + '/delete';
    return axios.delete(url);
  };

  /*
    MessageController
   */
  public static getAllMessagesByChatIdPageable = (
    chatId: string,
    offset?: number,
    size?: number,
  ): AxiosPromise<Message[]> => {
    const url = ChatService.baseUrl + '/message/' + chatId;
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static sendDirectMessage = (userId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/message/' + userId + '/direct';
    return axios.post(url, dto);
  };

  public static sendIndirectMessage = (chatId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/message/' + chatId;
    return axios.post(url, dto);
  };

  public static editMessage = (messageId: string, dto: MessageDTO): AxiosPromise<Message> => {
    const url = ChatService.baseUrl + '/message/' + messageId;
    return axios.put(url, dto);
  };

  public static deleteMessage = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/message/' + messageId;
    return axios.delete(url);
  };

  /*
    ReactionController
   */
  public static likeMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reaction/' + messageId + '/like';
    return axios.post(url);
  };

  public static dislikeMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reaction/' + messageId + '/dislike';
    return axios.post(url);
  };

  public static noneMessageReaction = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/reaction/' + messageId;
    return axios.delete(url);
  };

  /*
    StatusController
   */
  public static markMessageAsRead = (messageId: string): AxiosPromise<void> => {
    const url = ChatService.baseUrl + '/status/' + messageId + '/read';
    return axios.post(url);
  };
}

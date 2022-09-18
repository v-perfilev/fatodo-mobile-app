import {AxiosPromise, AxiosRequestConfig} from 'axios';
import {Group, GroupInfo, GroupMember} from '../models/Group';
import {PageableList} from '../models/PageableList';
import {Item, ItemInfo} from '../models/Item';
import {ItemDTO} from '../models/dto/ItemDTO';
import axios from '../shared/axios';

export default class ItemService {
  private static baseUrl = '/api/item';

  /*
  GroupController
   */

  public static getAllGroups = (): AxiosPromise<PageableList<Group>> => {
    const url = ItemService.baseUrl + '/group';
    return axios.get(url);
  };

  public static getAllCommonGroups = (userId: string): AxiosPromise<Group[]> => {
    const url = ItemService.baseUrl + '/group/' + userId + '/member';
    return axios.get(url);
  };

  public static getGroup = (id: string): AxiosPromise<Group> => {
    const url = ItemService.baseUrl + '/group/' + id;
    return axios.get(url);
  };

  public static createGroup = (formData: FormData): AxiosPromise<Group> => {
    const url = ItemService.baseUrl + '/group';
    const config: AxiosRequestConfig = {
      headers: {'content-type': 'multipart/form-data'},
      transformRequest: (_) => formData,
    };
    return axios.post(url, formData, config);
  };

  public static updateGroup = (formData: FormData): AxiosPromise<Group> => {
    const url = ItemService.baseUrl + '/group';
    const config: AxiosRequestConfig = {
      headers: {'content-type': 'multipart/form-data'},
      transformRequest: (_) => formData,
    };
    return axios.put(url, formData, config);
  };

  public static deleteGroup = (id: string): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/group/' + id;
    return axios.delete(url);
  };

  /*
  ItemController
   */

  public static getPreviewItemsByGroupIds = (groupIds: string[]): AxiosPromise<[string, PageableList<Item>][]> => {
    const url = ItemService.baseUrl + '/item/preview';
    const params = {groupIds};
    const transformResponse = (data: string) => Object.entries(JSON.parse(data));
    return axios.get(url, {params, transformResponse});
  };

  public static getItemsByGroupId = (
    groupId: string,
    offset?: number,
    size?: number,
  ): AxiosPromise<PageableList<Item>> => {
    const url = ItemService.baseUrl + '/item/' + groupId + '/group';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getArchivedItemsByGroupId = (
    groupId: string,
    offset?: number,
    size?: number,
  ): AxiosPromise<PageableList<Item>> => {
    const url = ItemService.baseUrl + '/item/' + groupId + '/group/archived';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getItem = (id: string): AxiosPromise<Item> => {
    const url = ItemService.baseUrl + '/item/' + id;
    return axios.get(url);
  };

  public static createItem = (dto: ItemDTO): AxiosPromise<Item> => {
    const url = ItemService.baseUrl + '/item';
    return axios.post(url, dto);
  };

  public static updateItem = (dto: ItemDTO): AxiosPromise<Item> => {
    const url = ItemService.baseUrl + '/item';
    return axios.put(url, dto);
  };

  public static updateItemStatus = (id: string, status: string): AxiosPromise<Item> => {
    const dto = {id, status};
    const url = ItemService.baseUrl + '/item/status';
    return axios.put(url, dto);
  };

  public static updateItemArchived = (id: string, archived: boolean): AxiosPromise<Item> => {
    const dto = {id, archived};
    const url = ItemService.baseUrl + '/item/archived';
    return axios.put(url, dto);
  };

  public static deleteItem = (id: string): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/item/' + id;
    return axios.delete(url);
  };

  /*
  ConfigurationController
   */

  public static setGroupOrder = (order: string[]): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/configuration/order';
    return axios.post(url, order);
  };

  /*
  MemberController
   */

  public static addMembersToGroup = (groupId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/member/' + groupId;
    return axios.post(url, userIds);
  };

  public static removeMembersFromGroup = (groupId: string, userIds: string[]): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/member/' + groupId;
    const params = {ids: userIds};
    return axios.delete(url, {params});
  };

  public static editGroupMember = (groupId: string, member: GroupMember): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/member/' + groupId;
    return axios.put(url, member);
  };

  public static leaveGroup = (groupId: string): AxiosPromise<void> => {
    const url = ItemService.baseUrl + '/member/' + groupId + '/leave';
    return axios.delete(url);
  };

  /*
  InfoController
   */

  public static getGroupInfoByIds = (groupIds: string[]): AxiosPromise<GroupInfo[]> => {
    const url = ItemService.baseUrl + '/info/group';
    const params = {ids: groupIds};
    return axios.get(url, {params});
  };

  public static getItemInfoByIds = (itemIds: string[]): AxiosPromise<ItemInfo[]> => {
    const url = ItemService.baseUrl + '/info/item';
    const params = {ids: itemIds};
    return axios.get(url, {params});
  };
}

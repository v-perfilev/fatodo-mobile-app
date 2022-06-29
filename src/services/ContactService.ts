import {AxiosPromise} from 'axios';
import {ContactInfo} from '../models/ContactInfo';
import {ContactRelation} from '../models/ContactRelation';
import {ContactRequest} from '../models/ContactRequest';
import {ContactRequestDTO} from '../models/dto/ContactRequestDTO';
import axios from '../shared/axios';

export default class ContactService {
  private static baseUrl = '/api/contact';

  public static getInfo = (): AxiosPromise<ContactInfo> => {
    const url = ContactService.baseUrl + '/info';
    return axios.get(url);
  };

  public static getRelations = (): AxiosPromise<ContactRelation[]> => {
    const url = ContactService.baseUrl + '/relations';
    return axios.get(url);
  };

  public static getCommonRelations = (userId: string): AxiosPromise<ContactRelation[]> => {
    const url = ContactService.baseUrl + '/relations/' + userId + '/user';
    return axios.get(url);
  };

  public static removeRelation = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/relations/' + userId;
    return axios.delete(url);
  };

  public static getOutcomingRequests = (): AxiosPromise<ContactRequest[]> => {
    const url = ContactService.baseUrl + '/requests/outcoming';
    return axios.get(url);
  };

  public static getIncomingRequests = (): AxiosPromise<ContactRequest[]> => {
    const url = ContactService.baseUrl + '/requests/incoming';
    return axios.get(url);
  };

  public static sendRequest = (dto: ContactRequestDTO): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/requests/send';
    return axios.post(url, dto);
  };

  public static removeRequest = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/requests/remove/' + userId;
    return axios.get(url);
  };

  public static acceptRequest = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/requests/accept/' + userId;
    return axios.get(url);
  };

  public static declineRequest = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/requests/decline/' + userId;
    return axios.get(url);
  };
}

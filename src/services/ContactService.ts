import {AxiosPromise} from 'axios';
import {ContactRequestDTO} from '../models/dto/ContactRequestDTO';
import axios from '../shared/axios';
import {ContactInfo, ContactRelation, ContactRequest} from '../models/Contact';

export default class ContactService {
  private static baseUrl = '/api/contact';

  public static getInfo = (): AxiosPromise<ContactInfo> => {
    const url = ContactService.baseUrl + '/info';
    return axios.get(url);
  };

  public static getRelations = (): AxiosPromise<ContactRelation[]> => {
    const url = ContactService.baseUrl + '/relation';
    return axios.get(url);
  };

  public static getCommonRelations = (userId: string): AxiosPromise<ContactRelation[]> => {
    const url = ContactService.baseUrl + '/relation/' + userId + '/user';
    return axios.get(url);
  };

  public static removeRelation = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/relation/' + userId;
    return axios.delete(url);
  };

  public static getOutcomingRequests = (): AxiosPromise<ContactRequest[]> => {
    const url = ContactService.baseUrl + '/request/outcoming';
    return axios.get(url);
  };

  public static getIncomingRequests = (): AxiosPromise<ContactRequest[]> => {
    const url = ContactService.baseUrl + '/request/incoming';
    return axios.get(url);
  };

  public static sendRequest = (dto: ContactRequestDTO): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/request';
    return axios.post(url, dto);
  };

  public static removeRequest = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/request/' + userId;
    return axios.delete(url);
  };

  public static acceptRequest = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/request/' + userId + '/accept';
    return axios.put(url);
  };

  public static declineRequest = (userId: string): AxiosPromise<void> => {
    const url = ContactService.baseUrl + '/request/' + userId + '/decline';
    return axios.put(url);
  };
}

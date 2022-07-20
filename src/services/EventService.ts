import {AxiosPromise} from 'axios';
import axios from '../shared/axios';
import {PageableReadableList} from '../models/PageableReadableList';

export default class EventService {
  private static baseUrl = '/api/event/';

  public static getEventsPageable = (offset?: number, size?: number): AxiosPromise<PageableReadableList<Event>> => {
    const url = EventService.baseUrl + 'user-events';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getUnreadCount = (): AxiosPromise<number> => {
    const url = EventService.baseUrl + 'unread-count';
    return axios.get(url);
  };

  public static refresh = (): AxiosPromise<void> => {
    const url = EventService.baseUrl + 'refresh';
    return axios.get(url);
  };
}

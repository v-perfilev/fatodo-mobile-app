import {AxiosPromise} from 'axios';
import axios from '../shared/axios';
import {PageableReadableList} from '../models/PageableReadableList';
import {Event} from '../models/Event';

export default class EventService {
  private static baseUrl = '/api/event';

  public static getEventsPageable = (offset?: number, size?: number): AxiosPromise<PageableReadableList<Event>> => {
    const url = EventService.baseUrl + '/user-event';
    const params = {offset, size};
    return axios.get(url, {params});
  };

  public static getUnreadCount = (): AxiosPromise<number> => {
    const url = EventService.baseUrl + '/user-event/unread';
    return axios.get(url);
  };

  public static refresh = (): AxiosPromise<void> => {
    const url = EventService.baseUrl + '/user-event/refresh';
    return axios.put(url);
  };
}

import axios, {AxiosPromise} from 'axios';
import {Reminder} from '../models/Reminder';

export default class NotificationService {
  private static baseUrl = '/api/notification';

  public static getAllByTargetId = (targetId: string): AxiosPromise<Reminder[]> => {
    const url = NotificationService.baseUrl + '/reminders/' + targetId;
    return axios.get(url);
  };
}

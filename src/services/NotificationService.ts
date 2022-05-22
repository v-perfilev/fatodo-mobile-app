import {AxiosPromise} from 'axios';
import {Reminder} from '../models/Reminder';
import {axiosIgnore404} from '../shared/axios';

export default class NotificationService {
  private static baseUrl = '/api/notification';

  public static getAllByTargetId = (targetId: string): AxiosPromise<Reminder[]> => {
    const url = NotificationService.baseUrl + '/reminders/' + targetId;
    return axiosIgnore404.get(url);
  };
}

import {AxiosPromise} from 'axios';
import {CalendarReminder, Reminder} from '../models/Reminder';
import {axiosDefault, axiosIgnore404} from '../shared/axios';

export default class NotificationService {
  private static baseUrl = '/api/notification';

  public static getAllByMonth = (year: number, month: number, timezone: string): AxiosPromise<Reminder[]> => {
    const url = NotificationService.baseUrl + '/reminder/calendar';
    const params = {year, month, timezone};
    return axiosDefault.get(url, {params});
  };

  public static getAllByTargetId = (targetId: string): AxiosPromise<CalendarReminder[]> => {
    const url = NotificationService.baseUrl + '/reminder/' + targetId;
    return axiosIgnore404.get(url);
  };
}

import {AxiosPromise} from 'axios';
import {CalendarReminder, Reminder} from '../models/Reminder';
import {axiosDefault, axiosIgnore404} from '../shared/axios';

export default class NotificationService {
  private static baseUrl = '/api/notification';

  public static getAllByMonths = (
    yearFrom: number,
    monthFrom: number,
    yearTo: number,
    monthTo: number,
    timezone: string,
  ): AxiosPromise<[string, CalendarReminder[]][]> => {
    const url = NotificationService.baseUrl + '/reminder/calendar';
    const params = {yearFrom, monthFrom, yearTo, monthTo, timezone};
    const transformResponse = (data: string) => Object.entries(JSON.parse(data));
    return axiosDefault.get(url, {params, transformResponse});
  };

  public static getAllByTargetId = (targetId: string): AxiosPromise<Reminder[]> => {
    const url = NotificationService.baseUrl + '/reminder/' + targetId;
    return axiosIgnore404.get(url);
  };
}

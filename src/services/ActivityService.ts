import {axiosIgnoreAll} from '../shared/axios';
import {AxiosPromise} from 'axios';
import {ActivityDTO} from '../models/dto/ActivityDTO';

export default class AnalyticsService {
  private static baseUrl = '/api/analytics';

  public static writeActivity = (dto: ActivityDTO): AxiosPromise<void> => {
    const url = AnalyticsService.baseUrl + '/activity';
    return axiosIgnoreAll.put(url, dto);
  };
}

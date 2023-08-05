import {axiosIgnoreAll} from '../shared/axios';
import axios, {AxiosPromise} from 'axios';
import {HEALTH_TIMEOUT} from '../constants';

export default class HealthService {
  private static baseUrl = '/api/health';

  public static check = (): AxiosPromise<void> => {
    const source = axios.CancelToken.source();
    setTimeout(() => source.cancel(), HEALTH_TIMEOUT);
    return axiosIgnoreAll.get(HealthService.baseUrl, {cancelToken: source.token});
  };
}

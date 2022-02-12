import {AxiosResponse} from 'axios';

export class ResponseUtils {
  public static getStatus = (response: AxiosResponse): number => response.status;

  public static getFeedbackCode = (response: AxiosResponse): string => response.data?.feedbackCode || '';
}

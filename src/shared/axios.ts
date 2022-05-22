import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_TIMEOUT, API_URL} from '../constants';
import {SecurityUtils} from './utils/SecurityUtils';
import {ResponseUtils} from './utils/ResponseUtils';
import {TranslationUtils} from './utils/TranslationUtils';
import {Snack, SnackBuilder} from '../models/Snack';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;

export const axiosDefault = axios.create();
export const axiosIgnore404 = axios.create();

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnack: (snack: Snack) => void;
  handleResponse: (response: AxiosResponse) => void;
}

export const setupAxiosInterceptors = ({onUnauthenticated, enqueueSnack, handleResponse}: SetupAxiosActions): void => {
  const enqueueErrorNotification = (message: string): void => {
    const snack = new SnackBuilder(message).setVariantColor('error').build();
    enqueueSnack(snack);
  };

  const defaultHandleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
    } else {
      handleResponse(response);
    }
  };

  const ignore404handleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
    } else if (status !== 404) {
      handleResponse(response);
    }
  };

  const handleErrorStatus = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
  };

  const defaultOnResponseError = (err: AxiosError): AxiosPromise => {
    defaultHandleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err);
  };

  const ignore404OnResponseError = (err: AxiosError): AxiosPromise => {
    ignore404handleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err);
  };

  const onRequest = async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await SecurityUtils.getAuthToken();
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

  axiosDefault.interceptors.request.use(onRequest);
  axiosDefault.interceptors.response.use(onResponseSuccess, defaultOnResponseError);

  axiosIgnore404.interceptors.request.use(onRequest);
  axiosIgnore404.interceptors.response.use(onResponseSuccess, ignore404OnResponseError);
};

export default axiosDefault;

import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_TIMEOUT, API_URL} from '../constants';
import {SecurityUtils} from './utils/SecurityUtils';
import {ResponseUtils} from './utils/ResponseUtils';
import {TranslationUtils} from './utils/TranslationUtils';
import {Snack, SnackBuilder} from '../models/Snack';
import axiosRetry from 'axios-retry';
import qs from 'qs';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;
axios.defaults.paramsSerializer = (params: any) => qs.stringify(params, {arrayFormat: 'comma'});

export const axiosDefault = axios.create();
export const axiosIgnore404 = axios.create();

const retryDelay = axiosRetry.exponentialDelay;
axiosRetry(axiosDefault, {retryDelay});
axiosRetry(axiosIgnore404, {retryDelay});

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnack: (snack: Snack) => void;
  handleResponse: (status: number, feedbackCode: string) => void;
}

export const setupAxiosInterceptors = ({onUnauthenticated, enqueueSnack, handleResponse}: SetupAxiosActions): void => {
  const logRequest = (request: AxiosRequestConfig): void => {
    const consoleMsg = `Request sent: ${request.method.toUpperCase()} ${request.url}`;
    console.info(consoleMsg);
  };

  const logError = (response: AxiosResponse): void => {
    const responsePath = response.data.path || 'unknown path';
    const responseMsg = response.data.message || 'no message';
    const consoleMsg = `Request failed: ${responsePath} - ${response.status}:  ${responseMsg}`;
    console.warn(consoleMsg);
  };

  const enqueueErrorNotification = (message: string): void => {
    const snack = new SnackBuilder(message).setVariantColor('error').build();
    enqueueSnack(snack);
  };

  const defaultHandleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
      logError(response);
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
      logError(response);
    } else {
      const feedbackCode = ResponseUtils.getFeedbackCode(response);
      handleResponse(status, feedbackCode);
      logError(response);
    }
  };

  const ignore404handleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
      logError(response);
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
      logError(response);
    } else if (status !== 404) {
      const feedbackCode = ResponseUtils.getFeedbackCode(response);
      handleResponse(status, feedbackCode);
      logError(response);
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
    return Promise.reject(err.response);
  };

  const ignore404OnResponseError = (err: AxiosError): AxiosPromise => {
    ignore404handleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const onRequest = async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await SecurityUtils.getAuthToken();
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    logRequest(request);
    return request;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

  axiosDefault.interceptors.request.use(onRequest);
  axiosDefault.interceptors.response.use(onResponseSuccess, defaultOnResponseError);

  axiosIgnore404.interceptors.request.use(onRequest);
  axiosIgnore404.interceptors.response.use(onResponseSuccess, ignore404OnResponseError);
};

export default axiosDefault;

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
const retryCondition = (error: AxiosError) => !error.response && error.config.method.toLowerCase() === 'get';
axiosRetry(axiosDefault, {retryDelay, retryCondition});
axiosRetry(axiosIgnore404, {retryDelay, retryCondition});

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueSnack: (snack: Snack) => void;
  handleResponse: (status: number, feedbackCode: string) => void;
}

interface ObservableAxiosRequestConfig extends AxiosRequestConfig {
  startTime?: Date;
}

export const setupAxiosInterceptors = ({onUnauthenticated, enqueueSnack, handleResponse}: SetupAxiosActions): void => {
  const logSuccess = (request: ObservableAxiosRequestConfig): void => {
    const method = request.method.toUpperCase();
    const url = request.url;
    const time = new Date().getTime() - request.startTime.getTime();
    const consoleMsg = `Request sent: ${method} ${url}: ${time}ms`;
    console.info(consoleMsg);
  };

  const logError = (response: AxiosResponse): void => {
    const method = response.request.method.toUpperCase();
    const url = response?.data.path || 'unknown path';
    const status = response?.status || 'unknown status';
    const msg = response?.data.message || 'no message';
    const consoleMsg = `Request failed: ${method} ${url}: ${status} - ${msg}`;
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

  const defaultOnResponseError = (err: AxiosError): AxiosPromise<AxiosResponse> => {
    defaultHandleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const ignore404OnResponseError = (err: AxiosError): AxiosPromise<AxiosResponse> => {
    ignore404handleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const onRequest = async (config: ObservableAxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await SecurityUtils.getAuthToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    config.startTime = new Date();
    return config;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => {
    const config = response.config as ObservableAxiosRequestConfig;
    logSuccess(config);
    return response;
  };

  axiosDefault.interceptors.request.use(onRequest);
  axiosDefault.interceptors.response.use(onResponseSuccess, defaultOnResponseError);

  axiosIgnore404.interceptors.request.use(onRequest);
  axiosIgnore404.interceptors.response.use(onResponseSuccess, ignore404OnResponseError);
};

export default axiosDefault;

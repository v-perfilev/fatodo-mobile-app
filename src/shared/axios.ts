import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {API_TIMEOUT, API_URL} from '../constants';
import {SecurityUtils} from './utils/SecurityUtils';
import {ResponseUtils} from './utils/ResponseUtils';
import {TranslationUtils} from './utils/TranslationUtils';
import {Snack, SnackBuilder} from '../models/Snack';

axios.defaults.timeout = API_TIMEOUT;
axios.defaults.baseURL = API_URL;

interface SetupAxiosActions {
  onUnauthenticated: () => void;
  enqueueReduxSnackbar: (snack: Snack) => void;
}

const setupAxiosInterceptors = ({onUnauthenticated, enqueueReduxSnackbar}: SetupAxiosActions): void => {
  const enqueueErrorNotification = (message: string): void => {
    const snack = new SnackBuilder(message).setVariantColor('error').build();
    enqueueReduxSnackbar(snack);
  };

  const handleErrorFeedback = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status >= 500) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('default'));
    } else if (!status) {
      enqueueErrorNotification(TranslationUtils.getFeedbackTranslation('connection'));
    }
  };

  const handleErrorStatus = (response: AxiosResponse): void => {
    const status = ResponseUtils.getStatus(response);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
  };

  const onResponseError = (err: AxiosError): AxiosPromise => {
    handleErrorFeedback(err.response);
    handleErrorStatus(err.response);
    return Promise.reject(err.response);
  };

  const onRequestSuccess = async (request: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await SecurityUtils.getAuthToken();
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ReduxSnack, SnackState} from './snackType';
import {Snack, SnackBuilder, SnackVariant} from '../../models/Snack';
import {TranslationUtils} from '../../shared/utils/TranslationUtils';
import {ResponseUtils} from '../../shared/utils/ResponseUtils';
import {AxiosResponse} from 'axios';

export interface SnackCodePayload {
  code: string;
  variant: SnackVariant;
}

const initialState: SnackState = {
  list: [],
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    handleCode: (state: SnackState, action: PayloadAction<SnackCodePayload>) => {
      const code = action.payload.code;
      const variant = action.payload.variant;
      const message = TranslationUtils.getSnackTranslation(code);
      const snack = message ? new SnackBuilder(message).setVariantColor(variant).build() : null;
      const reduxSnack = {...snack, dismissed: false, key: `${new Date().getTime()}${Math.random()}`};
      const list = [...state.list, reduxSnack];
      return {list};
    },

    handleResponse: (state: SnackState, action: PayloadAction<AxiosResponse>) => {
      const response = action.payload;
      const feedbackCode = ResponseUtils.getFeedbackCode(response);
      const status = ResponseUtils.getStatus(response);
      const isStatusCorrect = status && status < 500;
      const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
      const snack = isStatusCorrect && message ? new SnackBuilder(message).setStatusColor(status).build() : null;
      const reduxSnack = {...snack, dismissed: false, key: `${new Date().getTime()}${Math.random()}`};
      const list = [...state.list, reduxSnack];
      return {list};
    },

    enqueueSnack: (state: SnackState, action: PayloadAction<Snack>) => {
      const snack = action.payload;
      const reduxSnack = {...snack, dismissed: false, key: `${new Date().getTime()}${Math.random()}`};
      const list = [...state.list, reduxSnack];
      return {list};
    },

    closeSnack: (state: SnackState, action: PayloadAction<string>) => {
      const isDismissAll = (n: ReduxSnack): boolean => action.payload === 'all' || n.key === action.payload;
      const handle = (n: ReduxSnack): ReduxSnack => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
      const list = state.list.map((notification) => handle(notification));
      return {list};
    },

    removeSnack: (state: SnackState, action: PayloadAction<string>) => {
      const filter = (n: ReduxSnack): boolean => n.key !== action.payload;
      const list = state.list.filter((notification) => filter(notification));
      return {list};
    },
  },
});

export default snackSlice;

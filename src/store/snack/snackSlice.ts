import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ReduxSnack, SnackState} from './snackType';
import {Snack, SnackBuilder, SnackVariant} from '../../models/Snack';
import {TranslationUtils} from '../../shared/utils/TranslationUtils';

export interface SnackCodePayload {
  code: string;
  variant: SnackVariant;
}

interface SnackResponsePayload {
  status: number;
  feedbackCode: string;
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
      state.list = [...state.list, reduxSnack];
    },

    handleResponse: (state: SnackState, action: PayloadAction<SnackResponsePayload>) => {
      const feedbackCode = action.payload.feedbackCode;
      const status = action.payload.status;
      const isStatusCorrect = status && status < 500;
      const message = TranslationUtils.getFeedbackTranslation(feedbackCode);
      const snack = isStatusCorrect && message ? new SnackBuilder(message).setStatusColor(status).build() : null;
      const reduxSnack = {...snack, dismissed: false, key: `${new Date().getTime()}${Math.random()}`};
      state.list = snack ? [...state.list, reduxSnack] : state.list;
    },

    enqueueSnack: (state: SnackState, action: PayloadAction<Snack>) => {
      const snack = action.payload;
      const reduxSnack = {...snack, dismissed: false, key: `${new Date().getTime()}${Math.random()}`};
      state.list = [...state.list, reduxSnack];
    },

    closeSnack: (state: SnackState, action: PayloadAction<string>) => {
      const isDismissAll = (n: ReduxSnack): boolean => action.payload === 'all' || n.key === action.payload;
      const handle = (n: ReduxSnack): ReduxSnack => (isDismissAll(n) ? {...n, dismissed: true} : {...n});
      state.list = state.list.map((notification) => handle(notification));
    },

    removeSnack: (state: SnackState, action: PayloadAction<string>) => {
      const filter = (n: ReduxSnack): boolean => n.key !== action.payload;
      state.list = state.list.filter((notification) => filter(notification));
    },
  },
});

export default snackSlice;

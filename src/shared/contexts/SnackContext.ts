import {AxiosResponse} from 'axios';
import * as React from 'react';
import {useContext} from 'react';
import {Snack, SnackVariant} from '../../models/Snack';

export interface SnackState {
  handleResponse: (response: AxiosResponse, allowedCodes?: string[] | '*', excludedCodes?: string[] | '') => void;
  handleCode: (code: string, variant: SnackVariant) => void;
  enqueueSnack: (snack: Snack) => void;
  closeSnack: (key: string) => void;
}

export const SnackContext = React.createContext<SnackState>({} as SnackState);
export const useSnackContext = (): SnackState => useContext(SnackContext);

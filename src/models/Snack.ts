import {OptionsObject, SnackbarMessage} from 'notistack';

export default interface Snack {
  message: SnackbarMessage;
  options?: OptionsObject;
}

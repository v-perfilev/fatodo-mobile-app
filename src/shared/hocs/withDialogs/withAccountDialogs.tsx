import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {flowRight} from 'lodash';
import {AccountDialogContext} from '../../contexts/dialogContexts/AccountDialogContext';
import AccountDeleteDialog, {
  AccountDeleteDialogProps,
  defaultAccountDeleteDialogProps,
} from '../../../screens/account/dialogs/accountDeleteDialog/AccountDeleteDialog';

enum AccountDialogs {
  DELETE = 'ACCOUNT_DELETE_DIALOG',
}

const withAccountDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showDeletePermanentlyDialog = useCallback((): void => {
    const show = true;
    const close = (): void => {
      clearDialogProps(AccountDialogs.DELETE);
    };
    const props: AccountDeleteDialogProps = {show, close};
    setDialogProps(AccountDialogs.DELETE, props);
  }, []);

  useEffect(() => {
    handleDialog(AccountDialogs.DELETE, AccountDeleteDialog, defaultAccountDeleteDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showDeletePermanentlyDialog,
    }),
    [showDeletePermanentlyDialog],
  );

  return (
    <AccountDialogContext.Provider value={context}>
      <Component {...props} />
    </AccountDialogContext.Provider>
  );
};

export default flowRight([memo, withAccountDialogs]);

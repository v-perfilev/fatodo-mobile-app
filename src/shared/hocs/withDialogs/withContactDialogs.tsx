import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import ContactRequestDialog, {
  ContactRequestDialogProps,
  defaultContactRequestDialogProps,
} from '../../../screens/contacts/dialogs/contactRequestDialog/ContactRequestDialog';
import {ContactDialogContext} from '../../contexts/dialogContexts/ContactDialogContext';
import {flowRight} from 'lodash';
import {User} from '../../../models/User';
import ContactRemoveDialog, {
  ContactRemoveDialogProps,
  defaultContactRemoveDialogProps,
} from '../../../screens/contacts/dialogs/ContactRemoveDialog';

enum ContactDialogs {
  REQUEST = 'CONTACT_REQUEST_DIALOG',
  REMOVE = 'CONTACT_REMOVE_DIALOG',
}

const withContactDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showContactRequestDialog = useCallback((): void => {
    const show = true;
    const close = (): void => {
      clearDialogProps(ContactDialogs.REQUEST);
    };
    const props: ContactRequestDialogProps = {show, close};
    setDialogProps(ContactDialogs.REQUEST, props);
  }, []);

  const showContactRemoveDialog = useCallback((user: User, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ContactDialogs.REMOVE);
    const props: ContactRemoveDialogProps = {user, show, close, onSuccess};
    setDialogProps(ContactDialogs.REMOVE, props);
  }, []);

  useEffect(() => {
    handleDialog(ContactDialogs.REQUEST, ContactRequestDialog, defaultContactRequestDialogProps);
    handleDialog(ContactDialogs.REMOVE, ContactRemoveDialog, defaultContactRemoveDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showContactRequestDialog,
      showContactRemoveDialog,
    }),
    [showContactRequestDialog, showContactRemoveDialog],
  );

  return (
    <ContactDialogContext.Provider value={context}>
      <Component {...props} />
    </ContactDialogContext.Provider>
  );
};

export default flowRight([memo, withContactDialogs]);

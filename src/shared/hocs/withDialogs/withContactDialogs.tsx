import * as React from 'react';
import {ComponentType, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import ContactRequestDialog, {
  ContactRequestDialogProps,
  defaultContactRequestDialogProps,
} from '../../../screens/contacts/dialogs/contactRequestDialog/ContactRequestDialog';
import {ContactDialogContext} from '../../contexts/dialogContexts/ContactDialogContext';

enum ContactDialogs {
  REQUEST = 'CONTACT_REQUEST_DIALOG',
}

const withContactDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showContactRequestDialog = (): void => {
    const show = true;
    const close = (): void => {
      clearDialogProps(ContactDialogs.REQUEST);
    };
    const props: ContactRequestDialogProps = {show, close};
    setDialogProps(ContactDialogs.REQUEST, props);
  };

  const initDialogs = (): void => {
    handleDialog(ContactDialogs.REQUEST, ContactRequestDialog, defaultContactRequestDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showContactRequestDialog,
  };

  return (
    <ContactDialogContext.Provider value={context}>
      <Component {...props} />
    </ContactDialogContext.Provider>
  );
};

export default withContactDialogs;

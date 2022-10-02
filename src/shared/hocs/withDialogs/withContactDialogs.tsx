import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import ContactRequestDialog, {
  ContactRequestDialogProps,
  defaultContactRequestDialogProps,
} from '../../../screens/contacts/dialogs/contactRequestDialog/ContactRequestDialog';
import {ContactDialogContext} from '../../contexts/dialogContexts/ContactDialogContext';
import {flowRight} from 'lodash';

enum ContactDialogs {
  REQUEST = 'CONTACT_REQUEST_DIALOG',
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

  useEffect(() => {
    handleDialog(ContactDialogs.REQUEST, ContactRequestDialog, defaultContactRequestDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showContactRequestDialog,
    }),
    [showContactRequestDialog],
  );

  return (
    <ContactDialogContext.Provider value={context}>
      <Component {...props} />
    </ContactDialogContext.Provider>
  );
};

export default flowRight([memo, withContactDialogs]);

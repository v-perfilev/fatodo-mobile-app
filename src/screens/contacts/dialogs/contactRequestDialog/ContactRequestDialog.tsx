import ModalDialog from '../../../../components/modals/ModalDialog';
import React from 'react';
import {useTranslation} from 'react-i18next';
import ContactRequestDialogForm from './ContactRequestDialogForm';
import {ContactRequestDTO} from '../../../../models/dto/ContactRequestDTO';
import {useAppDispatch} from '../../../../store/store';
import ContactsThunks from '../../../../store/contacts/contactsThunks';
import SnackActions from '../../../../store/snack/snackActions';

export type ContactRequestDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultContactRequestDialogProps: Readonly<ContactRequestDialogProps> = {
  show: false,
  close: (): void => undefined,
};

const ContactRequestDialog = ({show, close}: ContactRequestDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const request = (dto: ContactRequestDTO, stopSubmitting: () => void): void => {
    dispatch(ContactsThunks.sendRequest(dto))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('contact.requestSent', 'info'));
        close();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  const content = <ContactRequestDialogForm request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('contact:addContact.title')} content={content} />;
};

export default ContactRequestDialog;

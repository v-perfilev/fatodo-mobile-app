import ModalDialog from '../../../../components/modals/ModalDialog';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import ContactRequestDialogForm from './ContactRequestDialogForm';
import {ContactRequestDTO} from '../../../../models/dto/ContactRequestDTO';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {ContactsActions} from '../../../../store/contacts/contactsActions';
import AuthSelectors from '../../../../store/auth/authSelectors';

export type ContactRequestDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultContactRequestDialogProps: Readonly<ContactRequestDialogProps> = {
  show: false,
  close: (): void => null,
};

const ContactRequestDialog = ({show, close}: ContactRequestDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);

  const request = (dto: ContactRequestDTO, stopSubmitting: () => void): void => {
    dispatch(ContactsActions.sendRequestThunk(dto))
      .unwrap()
      .then(() => close())
      .catch(() => stopSubmitting());
  };

  const content = account && <ContactRequestDialogForm account={account} request={request} cancel={close} />;

  return <ModalDialog open={show} close={close} title={t('contact:addContact.title')} content={content} size="xl" />;
};

export default memo(ContactRequestDialog);

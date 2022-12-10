import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {User} from '../../../models/User';
import {ContactsActions} from '../../../store/contacts/contactsActions';

export type ContactRemoveDialogProps = {
  user: User;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultContactRemoveDialogProps: Readonly<ContactRemoveDialogProps> = {
  user: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const ContactRemoveDialog = ({user, close, onSuccess = () => null}: ContactRemoveDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(ContactsActions.removeRelationThunk(user.id))
      .unwrap()
      .then(() => {
        onSuccess();
        close();
      })
      .finally(() => setLoading(false));
  };

  const onDisagree = (): void => {
    close();
  };

  return (
    <ConfirmationDialog
      open={!!user}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('contact:removeContact.title')}
      content={t('contact:removeContact.text', {username: user?.username})}
      loading={loading}
    />
  );
};

export default memo(ContactRemoveDialog);

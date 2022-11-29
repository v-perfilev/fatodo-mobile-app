import React, {memo, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import {AuthActions} from '../../../../store/auth/authActions';
import AuthSelectors from '../../../../store/auth/authSelectors';
import ModalDialog from '../../../../components/modals/ModalDialog';
import GhostButton from '../../../../components/controls/GhostButton';
import SolidButton from '../../../../components/controls/SolidButton';
import {Text} from 'native-base';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import FVStack from '../../../../components/boxes/FVStack';

export type AccountDeleteDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultAccountDeleteDialogProps: Readonly<AccountDeleteDialogProps> = {
  show: false,
  close: () => null,
};

const AccountDeleteDialog = ({show, close}: AccountDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const [value, setValue] = useState<string>('');

  const disabled = useMemo<boolean>(() => {
    return value !== account?.username;
  }, [account, value]);

  const request = (): void => {
    dispatch(AuthActions.deleteAccountPermanentlyThunk(account.id))
      .unwrap()
      .then(() => close());
  };

  const handleChange = (value: string): void => {
    setValue(value);
  };

  const handleCancel = () => {
    setValue('');
    close();
  };

  const username = account?.username;

  const content = (
    <FVStack space={3}>
      <Text>{t('account:deletePermanently.text', {username})}</Text>
      <ClearableTextInput isErrorColor type="text" onChangeText={handleChange} />
    </FVStack>
  );

  const actions = (
    <>
      <GhostButton colorScheme="secondary" onPress={handleCancel}>
        {t('account:deletePermanently.cancel')}
      </GhostButton>
      <SolidButton colorScheme="error" isDisabled={disabled} onPress={request}>
        {t('account:deletePermanently.confirm')}
      </SolidButton>
    </>
  );

  return (
    <ModalDialog
      open={show}
      close={close}
      title={t('account:deletePermanently.title')}
      content={content}
      actions={actions}
      isErrorColor
    />
  );
};

export default memo(AccountDeleteDialog);

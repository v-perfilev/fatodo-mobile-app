import React from 'react';
import {useTranslation} from 'react-i18next';
import GhostButton from '../controls/GhostButton';
import SolidButton from '../controls/SolidButton';
import ModalDialog from './ModalDialog';

type ConfirmationDialogProps = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  content: string;
  loading?: boolean;
};

const ConfirmationDialog = ({open, onAgree, onDisagree, title, content, loading}: ConfirmationDialogProps) => {
  const {t} = useTranslation();

  const actions = (
    <>
      <GhostButton colorScheme="primary" isDisabled={loading} onPress={onDisagree}>
        {t('buttons.disagree')}
      </GhostButton>
      <SolidButton colorScheme="secondary" isDisabled={loading} isLoading={loading} onPress={onAgree}>
        {t('buttons.agree')}
      </SolidButton>
    </>
  );

  return <ModalDialog open={open} close={onDisagree} title={title} content={content} actions={actions} />;
};

export default ConfirmationDialog;

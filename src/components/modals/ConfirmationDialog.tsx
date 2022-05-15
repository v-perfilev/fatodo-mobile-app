import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import GhostButton from '../controls/GhostButton';
import ModalDialog from './ModalDialog';

type ConfirmationDialogProps = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  content: ReactElement | string;
  loading?: boolean;
};

const ConfirmationDialog = ({open, onAgree, onDisagree, title, content, loading}: ConfirmationDialogProps) => {
  const {t} = useTranslation();

  const actions = (
    <>
      <GhostButton colorScheme="primary" isDisabled={loading} isLoading={loading} onPress={onAgree}>
        {t('buttons.agree')}
      </GhostButton>
      <GhostButton colorScheme="secondary" isDisabled={loading} onPress={onDisagree}>
        {t('buttons.disagree')}
      </GhostButton>
    </>
  );

  return <ModalDialog open={open} close={onDisagree} title={title} content={content} actions={actions} />;
};

export default ConfirmationDialog;

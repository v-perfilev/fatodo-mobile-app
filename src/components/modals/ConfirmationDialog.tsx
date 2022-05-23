import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import GhostButton from '../controls/GhostButton';
import ModalDialog from './ModalDialog';
import {SizeType} from 'native-base/lib/typescript/components/types';

type ConfirmationDialogProps = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  content: ReactElement | string;
  loading?: boolean;
  size?: SizeType;
};

const ConfirmationDialog = ({open, onAgree, onDisagree, title, content, loading, size}: ConfirmationDialogProps) => {
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

  return <ModalDialog open={open} close={onDisagree} title={title} content={content} actions={actions} size={size} />;
};

export default ConfirmationDialog;

import React from 'react';
import {ThemeFactory} from '../../shared/themes/ThemeFactory';
import {useTranslation} from 'react-i18next';
import GhostButton from '../controls/GhostButton';
import SolidButton from '../controls/SolidButton';
import ThemeProvider from '../layouts/ThemeProvider';
import ModalDialog from './ModalDialog';

type ConfirmationDialogProps = {
  open: boolean;
  onAgree: () => void;
  onDisagree: () => void;
  title: string;
  content: string;
  loading?: boolean;
};

const theme = ThemeFactory.getDefaultTheme();

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

  return (
    <ThemeProvider theme={theme}>
      <ModalDialog open={open} close={onDisagree} title={title} content={content} actions={actions} />
    </ThemeProvider>
  );
};

export default ConfirmationDialog;

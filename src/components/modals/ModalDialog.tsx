import {Box, Button, Center, KeyboardAvoidingView, Modal, useColorModeValue} from 'native-base';
import React, {memo, ReactElement} from 'react';
import {LINEAR_GRADIENT, ThemeFactory} from '../../shared/themes/ThemeFactory';
import ThemeProvider from '../layouts/ThemeProvider';
import {SizeType} from 'native-base/lib/typescript/components/types';

type ModalDialogProps = {
  open: boolean;
  close: () => void;
  title: string;
  content: ReactElement | string;
  actions?: ReactElement;
  size?: SizeType;
};

const theme = ThemeFactory.getDefaultTheme();

const ModalDialog = ({open, close, title, content, actions, size}: ModalDialogProps) => {
  const bg = useColorModeValue('gray.50', 'gray.800');
  const backdrop = useColorModeValue('gray.400', 'gray.600');

  return (
    <ThemeProvider theme={theme}>
      <Modal isOpen={open} onClose={close} _backdrop={{bg: backdrop}} size={size}>
        <KeyboardAvoidingView w="100%" behavior="position">
          <Center>
            <Modal.Content borderRadius="0">
              <Modal.CloseButton
                rounded="3xl"
                _pressed={{bgColor: 'primary.100:alpha.30'}}
                _icon={{color: 'primary.500'}}
              />
              <Modal.Header bg={bg} borderBottomWidth="0" _text={{color: 'primary.500'}}>
                {title}
              </Modal.Header>
              <Box w="100%" h="1" bg={LINEAR_GRADIENT} />
              <Modal.Body>{content}</Modal.Body>
              {actions && (
                <Modal.Footer pt="0" borderTopWidth="0">
                  <Button.Group space="2">{actions}</Button.Group>
                </Modal.Footer>
              )}
            </Modal.Content>
          </Center>
        </KeyboardAvoidingView>
      </Modal>
    </ThemeProvider>
  );
};

export default memo(ModalDialog);

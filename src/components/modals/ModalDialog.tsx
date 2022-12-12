import {Box, Button, Center, KeyboardAvoidingView, Modal, useColorModeValue} from 'native-base';
import React, {memo, ReactElement} from 'react';
import {LINEAR_ERROR_GRADIENT, LINEAR_GRADIENT} from '../../shared/themes/ThemeFactory';
import {SizeType} from 'native-base/lib/typescript/components/types';
import {DARK_BG, LIGHT_BG} from '../../shared/themes/colors';

type ModalDialogProps = {
  open: boolean;
  close: () => void;
  title: string;
  content: ReactElement | string;
  isErrorColor?: boolean;
  actions?: ReactElement;
  size?: SizeType;
};

const ModalDialog = ({open, close, title, content, isErrorColor, actions, size}: ModalDialogProps) => {
  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const backdrop = useColorModeValue('gray.400', 'gray.600');

  const color = isErrorColor ? 'error' : 'primary';

  return (
    <Modal isOpen={open} onClose={close} _backdrop={{bg: backdrop}} size={size}>
      <KeyboardAvoidingView w="100%" behavior="position">
        <Center>
          <Modal.Content borderRadius="xl">
            <Modal.CloseButton
              rounded="3xl"
              _pressed={{bgColor: `${color}.100:alpha.30`}}
              _icon={{color: `${color}.500`}}
            />
            <Modal.Header bg={bg} borderBottomWidth="0" _text={{color: `${color}.500`}}>
              {title}
            </Modal.Header>
            <Box w="100%" h="3px" bg={isErrorColor ? LINEAR_ERROR_GRADIENT : LINEAR_GRADIENT} />
            <Modal.Body bg={bg} _scrollview={{bounces: false}}>
              {content}
            </Modal.Body>
            {actions && (
              <Modal.Footer bg={bg} pt="0" borderTopWidth="0">
                <Button.Group space="2">{actions}</Button.Group>
              </Modal.Footer>
            )}
          </Modal.Content>
        </Center>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default memo(ModalDialog);

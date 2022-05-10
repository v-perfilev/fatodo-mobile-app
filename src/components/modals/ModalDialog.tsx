import {Button, Modal} from 'native-base';
import React, {ReactElement} from 'react';
import {LINEAR_GRADIENT} from '../../shared/themes/ThemeFactory';

type ModalDialogProps = {
  open: boolean;
  close: () => void;
  title: string;
  content: ReactElement | string;
  actions: ReactElement;
};

const ModalDialog = ({open, close, title, content, actions}: ModalDialogProps) => (
  <Modal isOpen={open} onClose={close} _backdrop={{bg: 'gray.300'}}>
    <Modal.Content>
      <Modal.CloseButton bgColor={null} _pressed={{bgColor: 'none'}} _icon={{color: 'white'}} />
      <Modal.Header bg={LINEAR_GRADIENT} borderBottomWidth="0" _text={{color: 'white'}}>
        {title}
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer pt="0" borderTopWidth="0">
        <Button.Group space="2">{actions}</Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
);

export default ModalDialog;

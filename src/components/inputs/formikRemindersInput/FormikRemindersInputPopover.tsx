import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Reminder, ReminderPeriodicity} from '../../../models/Reminder';
import {Box, Button, Modal, useColorModeValue} from 'native-base';
import FormikRemindersInputToolbar from './FormikRemindersInputToolbar';
import GhostButton from '../../controls/GhostButton';
import FormikRemindersInputOnce from './FormikRemindersInputOnce';
import FormikRemindersInputDaily from './FormikRemindersInputDaily';
import FormikRemindersInputWeekly from './FormikRemindersInputWeekly';
import FormikRemindersInputMonthly from './FormikRemindersInputMonthly';
import FormikRemindersInputYearly from './FormikRemindersInputYearly';
import FVStack from '../../boxes/FVStack';
import {LINEAR_GRADIENT} from '../../../shared/themes/ThemeFactory';
import {DARK_BG, LIGHT_BG} from '../../../shared/themes/colors';

type FormikRemindersInputPopoverProps = {
  show: boolean;
  handleClose: (reminder: Reminder) => void;
};

const FormikRemindersInputPopover = ({show, handleClose}: FormikRemindersInputPopoverProps) => {
  const {t} = useTranslation();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('ONCE');

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const backdrop = useColorModeValue('gray.400', 'gray.600');

  const close = (): void => {
    handleClose(null);
  };

  const add = (): void => {
    handleClose(reminder);
  };

  return (
    <Modal isOpen={show} onClose={close} _backdrop={{bg: backdrop}}>
      <Modal.Content>
        <Modal.Header p="0" bg={bg} borderBottomWidth="0">
          <FormikRemindersInputToolbar periodicity={periodicity} setPeriodicity={setPeriodicity} />
        </Modal.Header>
        <Box w="100%" h="3px" bg={LINEAR_GRADIENT} />
        <Modal.Body bg={bg}>
          <FVStack defaultSpace position="relative" width="100%" minH="225" alignItems="center">
            {periodicity === 'ONCE' && <FormikRemindersInputOnce setReminder={setReminder} />}
            {periodicity === 'DAILY' && <FormikRemindersInputDaily setReminder={setReminder} />}
            {periodicity === 'WEEKLY' && <FormikRemindersInputWeekly setReminder={setReminder} />}
            {periodicity === 'MONTHLY' && <FormikRemindersInputMonthly setReminder={setReminder} />}
            {periodicity === 'YEARLY' && <FormikRemindersInputYearly setReminder={setReminder} />}
          </FVStack>
        </Modal.Body>
        <Modal.Footer pt="0" borderTopWidth="0" bg={bg}>
          <Button.Group space="3">
            <GhostButton colorScheme="secondary" onPress={close}>
              {t('item:actions.close')}
            </GhostButton>
            <GhostButton colorScheme="primary" onPress={add} isDisabled={!reminder}>
              {t('item:actions.add')}
            </GhostButton>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FormikRemindersInputPopover;

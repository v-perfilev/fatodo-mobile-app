import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Reminder, ReminderPeriodicity} from '../../../models/Reminder';
import {Button, Modal} from 'native-base';
import FormikRemindersInputToolbar from './FormikRemindersInputToolbar';
import GhostButton from '../../controls/GhostButton';
import FormikRemindersInputOnce from './FormikRemindersInputOnce';
import FormikRemindersInputDaily from './FormikRemindersInputDaily';
import FormikRemindersInputWeekly from './FormikRemindersInputWeekly';
import FormikRemindersInputMonthly from './FormikRemindersInputMonthly';
import FormikRemindersInputYearly from './FormikRemindersInputYearly';
import FVStack from '../../surfaces/FVStack';
import {useAppSelector} from '../../../store/hooks';
import AuthSelectors from '../../../store/auth/authSelectors';

type FormikRemindersInputPopoverProps = {
  show: boolean;
  handleClose: (reminder: Reminder) => void;
};

const FormikRemindersInputPopover = ({show, handleClose}: FormikRemindersInputPopoverProps) => {
  const account = useAppSelector(AuthSelectors.accountSelector);
  const {t} = useTranslation();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('ONCE');
  const locale = account.info.language;
  const timezone = account.info.timezone;

  const close = (): void => {
    handleClose(null);
  };

  const add = (): void => {
    handleClose(reminder);
  };

  return (
    <Modal isOpen={show} onClose={close} _backdrop={{bg: 'gray.300'}}>
      <Modal.Content>
        <Modal.Header p="0" borderBottomWidth="0">
          <FormikRemindersInputToolbar periodicity={periodicity} setPeriodicity={setPeriodicity} />
        </Modal.Header>
        <Modal.Body>
          <FVStack defaultSpace position="relative" width="100%" minH="225" alignItems="center">
            {periodicity === 'ONCE' && (
              <FormikRemindersInputOnce setReminder={setReminder} locale={locale} timezone={timezone} />
            )}
            {periodicity === 'DAILY' && (
              <FormikRemindersInputDaily setReminder={setReminder} locale={locale} timezone={timezone} />
            )}
            {periodicity === 'WEEKLY' && (
              <FormikRemindersInputWeekly setReminder={setReminder} locale={locale} timezone={timezone} />
            )}
            {periodicity === 'MONTHLY' && (
              <FormikRemindersInputMonthly setReminder={setReminder} locale={locale} timezone={timezone} />
            )}
            {periodicity === 'YEARLY' && (
              <FormikRemindersInputYearly setReminder={setReminder} locale={locale} timezone={timezone} />
            )}
          </FVStack>
        </Modal.Body>
        <Modal.Footer pt="0" borderTopWidth="0">
          <Button.Group space="2">
            <GhostButton colorScheme="primary" onPress={add} isDisabled={!reminder}>
              {t('item:actions.add')}
            </GhostButton>
            <GhostButton colorScheme="secondary" onPress={close}>
              {t('item:actions.close')}
            </GhostButton>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default FormikRemindersInputPopover;

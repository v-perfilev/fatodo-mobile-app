import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CalendarMonth} from '../../../models/Calendar';
import DateTimePicker from '../../../components/inputs/DateTimePicker';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import ModalDialog from '../../../components/modals/ModalDialog';
import GhostButton from '../../../components/controls/GhostButton';
import FBox from '../../../components/boxes/FBox';

export type CalendarSelectMonthDialogProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarMonth) => void;
  show: boolean;
  close: () => void;
};

export const defaultCalendarSelectMonthDialogProps: Readonly<CalendarSelectMonthDialogProps> = {
  month: undefined,
  selectMonth: undefined,
  show: false,
  close: (): void => null,
};

const CalendarSelectMonthDialog = ({month, selectMonth, show, close}: CalendarSelectMonthDialogProps) => {
  const {t} = useTranslation();
  const [value, setValue] = useState<Date>();

  const handleSelect = (): void => {
    const year = value.getFullYear();
    const month = value.getMonth();
    selectMonth({year, month});
    close();
  };

  useEffect(() => {
    month && setValue(new Date(month.year, month.month));
  }, [month]);

  const minDate = new Date(1900, 0);
  const maxDate = new Date(2100, 11);

  const content = value ? (
    <FBox alignItems="center">
      <DateTimePicker value={value} setValue={setValue} mode="monthWithYear" minDate={minDate} maxDate={maxDate} />
    </FBox>
  ) : null;

  const actions = (
    <>
      <GhostButton onPress={close} colorScheme="secondary">
        {t('calendar:selectMonth.buttons.cancel')}
      </GhostButton>
      <OutlinedButton colorScheme="primary" onPress={handleSelect}>
        {t('calendar:selectMonth.buttons.send')}
      </OutlinedButton>
    </>
  );

  return (
    <ModalDialog
      open={show}
      close={close}
      title={t('calendar:selectMonth.title')}
      content={content}
      actions={actions}
    />
  );
};

export default memo(CalendarSelectMonthDialog);

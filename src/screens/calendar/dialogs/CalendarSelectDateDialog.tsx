import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CalendarDate} from '../../../models/Calendar';
import DateTimePicker from '../../../components/inputs/DateTimePicker';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import ModalDialog from '../../../components/modals/ModalDialog';
import GhostButton from '../../../components/controls/GhostButton';
import FBox from '../../../components/boxes/FBox';

export type CalendarSelectDateDialogProps = {
  date: CalendarDate;
  selectDate: (month: CalendarDate) => void;
  show: boolean;
  close: () => void;
};

export const defaultCalendarSelectDateDialogProps: Readonly<CalendarSelectDateDialogProps> = {
  date: undefined,
  selectDate: undefined,
  show: false,
  close: (): void => null,
};

const CalendarSelectDateDialog = ({date, selectDate, show, close}: CalendarSelectDateDialogProps) => {
  const {t} = useTranslation();
  const [value, setValue] = useState<Date>();

  const handleSelect = (): void => {
    const year = value.getFullYear();
    const month = value.getMonth();
    const date = value.getDate();
    selectDate({year, month, date});
    close();
  };

  useEffect(() => {
    date && setValue(new Date(date.year, date.month, date.date));
  }, [date]);

  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(2100, 11, 31);

  const content = value ? (
    <FBox alignItems="center">
      <DateTimePicker value={value} setValue={setValue} mode="fullDate" minDate={minDate} maxDate={maxDate} />
    </FBox>
  ) : null;

  const actions = (
    <>
      <GhostButton onPress={close} colorScheme="secondary">
        {t('calendar:selectDate.buttons.cancel')}
      </GhostButton>
      <OutlinedButton colorScheme="primary" onPress={handleSelect}>
        {t('calendar:selectDate.buttons.send')}
      </OutlinedButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('calendar:selectDate.title')} content={content} actions={actions} />
  );
};

export default memo(CalendarSelectDateDialog);

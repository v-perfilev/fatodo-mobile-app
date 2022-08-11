import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {CalendarItem, CalendarMonth} from '../../../../models/Calendar';
import DateTimePicker from '../../../../components/inputs/DateTimePicker';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import OutlinedButton from '../../../../components/controls/OutlinedButton';
import ModalDialog from '../../../../components/modals/ModalDialog';
import GhostButton from '../../../../components/controls/GhostButton';
import FBox from '../../../../components/boxes/FBox';

export type CalendarSelectMonthDialogProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
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
  const account = useAppSelector(AuthSelectors.account);
  const [value, setValue] = useState<Date>();

  const handleSelect = (): void => {
    const calendarItem: CalendarItem = {year: value.getFullYear(), month: value.getMonth()};
    selectMonth(calendarItem);
    close();
  };

  useEffect(() => {
    month && setValue(new Date(month.year, month.month));
  }, [month]);

  const minDate = new Date(1900, 0);
  const maxDate = new Date(2100, 11);

  const content = value ? (
    <FBox alignItems="center">
      <DateTimePicker
        value={value}
        setValue={setValue}
        mode="monthWithYear"
        locale={account.info.language}
        minDate={minDate}
        maxDate={maxDate}
      />
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

export default CalendarSelectMonthDialog;

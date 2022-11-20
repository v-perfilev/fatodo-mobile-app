import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {CalendarDialogContext} from '../../contexts/dialogContexts/CalendarDialogContext';
import CalendarSelectDateDialog, {
  CalendarSelectDateDialogProps,
  defaultCalendarSelectDateDialogProps,
} from '../../../screens/calendar/dialogs/CalendarSelectDateDialog';
import {CalendarDate} from '../../../models/Calendar';
import {flowRight} from 'lodash';

enum CalendarDialogs {
  SELECT_MONTH = 'CALENDAR_SELECT_MONTH',
}

const withCalendarDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showSelectDateDialog = useCallback((date: CalendarDate, selectDate: (date: CalendarDate) => void): void => {
    const show = true;
    const close = (): void => {
      clearDialogProps(CalendarDialogs.SELECT_MONTH);
    };
    const props: CalendarSelectDateDialogProps = {date, selectDate, show, close};
    setDialogProps(CalendarDialogs.SELECT_MONTH, props);
  }, []);

  useEffect(() => {
    handleDialog(CalendarDialogs.SELECT_MONTH, CalendarSelectDateDialog, defaultCalendarSelectDateDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showSelectDateDialog,
    }),
    [showSelectDateDialog],
  );

  return (
    <CalendarDialogContext.Provider value={context}>
      <Component {...props} />
    </CalendarDialogContext.Provider>
  );
};

export default flowRight([memo, withCalendarDialogs]);

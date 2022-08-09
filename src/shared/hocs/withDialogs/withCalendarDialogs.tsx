import * as React from 'react';
import {ComponentType, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {CalendarDialogContext} from '../../contexts/dialogContexts/CalendarDialogContext';
import CalendarSelectMonthDialog, {
  CalendarSelectMonthDialogProps,
  defaultCalendarSelectMonthDialogProps,
} from '../../../screens/calendar/canlendarView/dialogs/CalendarSelectMonthDialog';
import {CalendarItem, CalendarRoute} from '../../../models/Calendar';

enum CalendarDialogs {
  SELECT_MONTH = 'CALENDAR_SELECT_MONTH',
}

const withCalendarDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showSelectMonthDialog = useCallback(
    (month: CalendarRoute, selectMonth: (month: CalendarItem) => void): void => {
      const show = true;
      const close = (): void => {
        clearDialogProps(CalendarDialogs.SELECT_MONTH);
      };
      const props: CalendarSelectMonthDialogProps = {month, selectMonth, show, close};
      setDialogProps(CalendarDialogs.SELECT_MONTH, props);
    },
    [setDialogProps, clearDialogProps],
  );

  const initDialogs = (): void => {
    handleDialog(CalendarDialogs.SELECT_MONTH, CalendarSelectMonthDialog, defaultCalendarSelectMonthDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showSelectMonthDialog,
  };

  return (
    <CalendarDialogContext.Provider value={context}>
      <Component {...props} />
    </CalendarDialogContext.Provider>
  );
};

export default withCalendarDialogs;

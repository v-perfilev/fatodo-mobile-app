import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {CalendarDialogContext} from '../../contexts/dialogContexts/CalendarDialogContext';
import CalendarSelectMonthDialog, {
  CalendarSelectMonthDialogProps,
  defaultCalendarSelectMonthDialogProps,
} from '../../../screens/calendar/dialogs/CalendarSelectMonthDialog';
import {CalendarMonth} from '../../../models/Calendar';
import {flowRight} from 'lodash';

enum CalendarDialogs {
  SELECT_MONTH = 'CALENDAR_SELECT_MONTH',
}

const withCalendarDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showSelectMonthDialog = useCallback(
    (month: CalendarMonth, selectMonth: (month: CalendarMonth) => void): void => {
      const show = true;
      const close = (): void => {
        clearDialogProps(CalendarDialogs.SELECT_MONTH);
      };
      const props: CalendarSelectMonthDialogProps = {month, selectMonth, show, close};
      setDialogProps(CalendarDialogs.SELECT_MONTH, props);
    },
    [],
  );

  useEffect(() => {
    handleDialog(CalendarDialogs.SELECT_MONTH, CalendarSelectMonthDialog, defaultCalendarSelectMonthDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showSelectMonthDialog,
    }),
    [showSelectMonthDialog],
  );

  return (
    <CalendarDialogContext.Provider value={context}>
      <Component {...props} />
    </CalendarDialogContext.Provider>
  );
};

export default flowRight([memo, withCalendarDialogs]);

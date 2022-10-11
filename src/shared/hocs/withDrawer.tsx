import React, {ComponentType, FC, memo, ReactElement, useMemo, useState} from 'react';
import {DrawerContext} from '../contexts/DrawerContext';
import {flowRight} from 'lodash';

const withDrawer =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    const [toggleDrawer, setToggleDrawer] = useState<() => void>(() => () => {});

    const value = useMemo(
      () => ({
        toggleDrawer,
        setToggleDrawer,
      }),
      [toggleDrawer],
    );

    return (
      <DrawerContext.Provider value={value}>
        <Component {...props} />
      </DrawerContext.Provider>
    );
  };

export default flowRight([memo, withDrawer]);

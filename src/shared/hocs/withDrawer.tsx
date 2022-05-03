import React, {ComponentType, useState} from 'react';
import {DrawerContext} from '../contexts/DrawerContext';

const withDrawer = (Component: ComponentType) => (props: any) => {
  const [toggleDrawer, setToggleDrawer] = useState<() => void>(() => () => {});

  const value = {toggleDrawer, setToggleDrawer};

  return (
    <DrawerContext.Provider value={value}>
      <Component {...props} />
    </DrawerContext.Provider>
  );
};

export default withDrawer;

import * as React from 'react';
import {useContext} from 'react';

export interface DrawerState {
  toggleDrawer: () => void;
  setToggleDrawer: (toggleDrawer: () => void) => void;
}

export const DrawerContext = React.createContext<DrawerState>({} as DrawerState);
export const useDrawerContext = (): DrawerState => useContext(DrawerContext);

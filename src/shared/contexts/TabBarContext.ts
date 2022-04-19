import * as React from 'react';
import {useContext} from 'react';
import {Theme} from 'native-base';

export interface TabBarState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const TabBarContext = React.createContext<TabBarState>({} as TabBarState);
export const useTabBarContext = (): TabBarState => useContext(TabBarContext);

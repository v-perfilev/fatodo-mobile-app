import * as React from 'react';
import {useContext} from 'react';
import {Theme} from 'native-base';

export interface TabThemeState {
  tabTheme: Theme;
  setTabTheme: (theme: Theme) => void;
}

export const TabThemeContext = React.createContext<TabThemeState>({} as TabThemeState);
export const useTabThemeContext = (): TabThemeState => useContext(TabThemeContext);

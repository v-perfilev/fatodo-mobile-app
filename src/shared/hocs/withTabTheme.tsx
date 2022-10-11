import React, {ComponentType, FC, ReactElement, useState} from 'react';
import {Theme} from 'native-base';
import {TabThemeContext} from '../contexts/TabThemeContext';

const withTabTheme =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    const [tabTheme, setTabTheme] = useState<Theme>();

    const value = {tabTheme, setTabTheme};

    return (
      <TabThemeContext.Provider value={value}>
        <Component {...props} />
      </TabThemeContext.Provider>
    );
  };

export default withTabTheme;

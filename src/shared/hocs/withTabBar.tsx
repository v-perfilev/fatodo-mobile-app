import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {TabBarContext} from '../contexts/TabBarContext';
import {Theme} from 'native-base';

const withTabBar =
  (Component: ComponentType): FC =>
  (props: any): ReactElement => {
    const [theme, setTheme] = useState<Theme>();

    const context = {theme, setTheme};

    return (
      <TabBarContext.Provider value={context}>
        <Component {...props} />
      </TabBarContext.Provider>
    );
  };

export default withTabBar;

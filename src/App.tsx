import React from 'react';
import {flowRight} from 'lodash';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
import withStore from './shared/hocs/withStore';
import {View} from 'react-native';
import Test from './screens/Test';

import './shared/i18n';
import './shared/axios';

const App = () => {
  return (
    <View>
      <Test />
    </View>
  );
};

export default flowRight([withStore, withNavigationContainer])(App);

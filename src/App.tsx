import React from 'react';
import {View} from 'react-native';
import withNavigationContainer from './shared/hocs/withNavigationContainer';
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

export default withNavigationContainer(App);

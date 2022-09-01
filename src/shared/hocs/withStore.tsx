import * as React from 'react';
import {ComponentType, memo} from 'react';
import {Provider} from 'react-redux';
import {store} from '../../store/store';
import {flowRight} from 'lodash';

const withStore = (Component: ComponentType) => (props: any) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default flowRight([memo, withStore]);

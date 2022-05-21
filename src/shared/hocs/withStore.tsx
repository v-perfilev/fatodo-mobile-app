import * as React from 'react';
import {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {store} from '../../store/store';

const withStore = (Component: ComponentType) => (props: any) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default withStore;

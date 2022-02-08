import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Provider} from 'react-redux';
import store from '../../store/store';

const withStore =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

export default withStore;

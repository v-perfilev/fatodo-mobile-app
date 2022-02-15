import React, {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/layouts/Header';

const withHeader =
  (Component: ComponentType): FC =>
  (props): ReactElement => {
    return (
      <>
        <Header {...props} />
        <Component {...props} />
      </>
    );
  };

export default withHeader;

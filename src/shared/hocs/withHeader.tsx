import React, {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/layouts/header';

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

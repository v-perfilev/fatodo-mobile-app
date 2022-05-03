import React, {ComponentType} from 'react';
import Header from '../../components/layouts/Header';

const withHeader = (Component: ComponentType) => (props: any) => {
  return (
    <>
      <Header />
      <Component {...props} />
    </>
  );
};

export default withHeader;

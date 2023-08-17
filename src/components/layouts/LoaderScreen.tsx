import React from 'react';
import SimpleScrollView from '../scrollable/SimpleScrollView';
import FCenter from '../boxes/FCenter';
import Loader from './Loader';

const LoaderScreen = () => {
  return (
    <SimpleScrollView position="relative">
      <FCenter grow>
        <Loader size={70} />
      </FCenter>
    </SimpleScrollView>
  );
};

export default LoaderScreen;

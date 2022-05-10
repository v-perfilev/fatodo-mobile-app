import React, {PropsWithChildren} from 'react';
import {Box} from 'native-base';
import CentredSpinner from './CentredSpinner';

type ConditionalSpinnerProps = PropsWithChildren<{
  loading: boolean;
}>;

const ConditionalSpinner = ({loading, children}: ConditionalSpinnerProps) => {
  return <Box flex="1">{loading ? <CentredSpinner /> : children}</Box>;
};

export default ConditionalSpinner;

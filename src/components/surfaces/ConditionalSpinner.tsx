import React, {PropsWithChildren} from 'react';
import CentredSpinner from './CentredSpinner';
import FBox from '../boxes/FBox';

type ConditionalSpinnerProps = PropsWithChildren<{
  loading: boolean;
}>;

const ConditionalSpinner = ({loading, children}: ConditionalSpinnerProps) => {
  return <FBox>{loading ? <CentredSpinner /> : children}</FBox>;
};

export default ConditionalSpinner;

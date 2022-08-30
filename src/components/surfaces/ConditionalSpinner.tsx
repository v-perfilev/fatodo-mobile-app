import React, {memo, PropsWithChildren} from 'react';
import CentredSpinner from './CentredSpinner';
import {IBoxProps} from 'native-base';

type ConditionalSpinnerProps = IBoxProps &
  PropsWithChildren<{
    loading: boolean;
  }>;

const ConditionalSpinner = ({loading, children, ...props}: ConditionalSpinnerProps) => {
  return loading ? <CentredSpinner {...props} /> : <>{children}</>;
};

export default memo(ConditionalSpinner);

import React, {memo, PropsWithChildren} from 'react';
import {IBoxProps} from 'native-base';
import CentredFSpinner from './CentredFSpinner';

type ConditionalSpinnerProps = IBoxProps &
  PropsWithChildren<{
    loading: boolean;
  }>;

const ConditionalSpinner = ({loading, children, ...props}: ConditionalSpinnerProps) => {
  return loading ? <CentredFSpinner {...props} /> : <>{children}</>;
};

export default memo(ConditionalSpinner);

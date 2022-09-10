import React, {memo, PropsWithChildren, ReactElement} from 'react';
import {IBoxProps} from 'native-base';
import CentredFSpinner from './CentredFSpinner';
import FBox from '../boxes/FBox';

type ConditionalSpinnerProps = IBoxProps &
  PropsWithChildren<{
    loading: boolean;
    loadingPlaceholder?: ReactElement;
  }>;

const ConditionalSpinner = ({loading, loadingPlaceholder, children, ...props}: ConditionalSpinnerProps) => {
  const loader = loadingPlaceholder ? <FBox {...props}>{loadingPlaceholder}</FBox> : <CentredFSpinner {...props} />;
  return loading ? <>{loader}</> : <>{children}</>;
};

export default memo(ConditionalSpinner);

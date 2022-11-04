import React, {memo, PropsWithChildren, ReactElement} from 'react';
import {IBoxProps} from 'native-base';
import CentredLoader from './CentredLoader';
import FBox from '../boxes/FBox';

type ConditionalSpinnerProps = IBoxProps &
  PropsWithChildren<{
    loading: boolean;
    loadingPlaceholder?: ReactElement;
  }>;

const ConditionalLoader = ({loading, loadingPlaceholder, children, ...props}: ConditionalSpinnerProps) => {
  const loader = loadingPlaceholder ? (
    <FBox flexGrow="1" {...props}>
      {loadingPlaceholder}
    </FBox>
  ) : (
    <CentredLoader {...props} size={50} />
  );
  return loading ? <>{loader}</> : <>{children}</>;
};

export default memo(ConditionalLoader);

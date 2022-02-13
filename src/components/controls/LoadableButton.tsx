import {Button, IButtonProps, Spinner} from 'native-base';
import React, {FC} from 'react';

type LoadableButtonProps = IButtonProps & {
  loading: boolean;
};

const LoadableButton: FC<LoadableButtonProps> = ({children, loading, ...props}) => {
  return (
    <Button minH="10" variant="solid" {...props}>
      {loading ? <Spinner /> : children}
    </Button>
  );
};

export default LoadableButton;

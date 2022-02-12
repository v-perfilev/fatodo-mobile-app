import {Button, IButtonProps, Spinner} from 'native-base';
import React, {FC} from 'react';

type LoadableButtonProps = IButtonProps & {
  text: string;
  loading: boolean;
};

const LoadableButton: FC<LoadableButtonProps> = ({text, loading, ...props}) => {
  return (
    <Button minH="10" {...props}>
      {loading ? <Spinner /> : text}
    </Button>
  );
};

export default LoadableButton;

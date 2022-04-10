import React, {FC} from 'react';
import {Card, IBoxProps} from 'native-base';

type PaperBoxProps = IBoxProps;

const PaperBox: FC<PaperBoxProps> = ({children}) => {
  return (
    <Card px="1" py="0.5">
      {children}
    </Card>
  );
};

export default PaperBox;

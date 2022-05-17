import React from 'react';
import {Box, Flex, IFlexProps} from 'native-base';

type FContainerProps = IFlexProps & {
  itemM?: number | string;
  itemMx?: number | string;
  itemMy?: number | string;
};

const FContainer = ({itemM, itemMx, itemMy, children, ...props}: FContainerProps) => {
  const containerM = itemM ? -itemM : undefined;
  const containerMx = itemMx ? -itemMx : undefined;
  const containerMy = itemMy ? -itemMy : undefined;

  return (
    <Flex m={containerM} mx={containerMx} my={containerMy} flexDir="row" wrap="wrap" {...props}>
      {React.Children.map(children, (child, index) => (
        <Box m={itemM} mx={itemMx} my={itemMy} key={index}>
          {child}
        </Box>
      ))}
    </Flex>
  );
};

export default FContainer;

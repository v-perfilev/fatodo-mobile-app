import React from 'react';
import {Flex, IScrollViewProps, ScrollView as RNScrollView} from 'native-base';

type FScrollViewProps = IScrollViewProps;

const containerStyle = {flexGrow: 1};

const FScrollView = ({children, p = 3, px, py, pt, pr, pb, pl, ...props}: FScrollViewProps) => (
  <RNScrollView _contentContainerStyle={containerStyle} {...props}>
    <Flex flex="1" m={p} mx={px} my={py} mt={pt} mr={pr} mb={pb} ml={pl}>
      {children}
    </Flex>
  </RNScrollView>
);

export default FScrollView;

import React from 'react';
import {Flex, IScrollViewProps, ScrollView} from 'native-base';
import {DEFAULT_SPACE} from '../../constants';

type FScrollViewProps = IScrollViewProps;

const containerStyle = {flexGrow: 1};

const FScrollView = ({children, p = DEFAULT_SPACE, px, py, pt, pr, pb, pl, ...props}: FScrollViewProps) => (
  <ScrollView _contentContainerStyle={containerStyle} {...props}>
    <Flex flex="1" m={p} mx={px} my={py} mt={pt} mr={pr} mb={pb} ml={pl}>
      {children}
    </Flex>
  </ScrollView>
);

export default FScrollView;

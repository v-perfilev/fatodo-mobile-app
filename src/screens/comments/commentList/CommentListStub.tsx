import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {HEADER_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import {Image, Text} from 'native-base';

const img = require('../../../../assets/images/content-2.png');
const size = 150;

const CommentListStub = () => {
  const {t} = useTranslation();

  return (
    <StubBox paddingTop={HEADER_HEIGHT} inverted>
      <FVStack space="5" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <Text fontSize="lg" fontWeight="bold" color="gray.400" textAlign="center">
          {t('comment:list.commentsNotFound')}
        </Text>
      </FVStack>
    </StubBox>
  );
};

export default CommentListStub;

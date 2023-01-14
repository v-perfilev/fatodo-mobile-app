import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {Image} from 'native-base';
import SolidButton from '../../../components/controls/SolidButton';
import FVStack from '../../../components/boxes/FVStack';

const img = require('../../../../assets/images/content-1.png');
const size = 150;

const ItemListStub = () => {
  const {t} = useTranslation();

  return (
    <StubBox>
      <FVStack space="5" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <SolidButton colorScheme="primary" size="lg" onPress={console.log}>
          {t('group:actions.createItem')}
        </SolidButton>
      </FVStack>
    </StubBox>
  );
};

export default ItemListStub;

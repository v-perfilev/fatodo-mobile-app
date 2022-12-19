import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import FVStack from '../../../components/boxes/FVStack';
import {Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';
import SolidButton from '../../../components/controls/SolidButton';

const img = require('../../../../assets/images/content-1.png');
const size = 150;

const GroupViewStub = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProps>();

  const goToGroupCreate = useCallback(() => navigation.navigate('GroupCreate'), []);

  return (
    <StubBox>
      <FVStack space="5" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <SolidButton colorScheme="primary" size="lg" onPress={goToGroupCreate}>
          {t('group:actions.createGroup')}
        </SolidButton>
      </FVStack>
    </StubBox>
  );
};

export default GroupViewStub;

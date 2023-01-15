import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {Image} from 'native-base';
import SolidButton from '../../../components/controls/SolidButton';
import FVStack from '../../../components/boxes/FVStack';
import {Group} from '../../../models/Group';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';

type GroupViewActiveStubProps = {
  group: Group;
  canEdit: boolean;
};

const img = require('../../../../assets/images/content-1.png');
const size = 150;

const GroupViewActiveStub = ({group, canEdit}: GroupViewActiveStubProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<GroupNavigationProps>();

  const goToItemCreate = useCallback((): void => navigation.navigate('ItemCreate', {group}), [group]);

  return (
    <StubBox>
      <FVStack space="5" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <SolidButton colorScheme="primary" size="lg" disabled={!canEdit} onPress={goToItemCreate}>
          {t('group:actions.createItem')}
        </SolidButton>
      </FVStack>
    </StubBox>
  );
};

export default GroupViewActiveStub;

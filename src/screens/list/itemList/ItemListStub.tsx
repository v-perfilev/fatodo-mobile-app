import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {Image} from 'native-base';
import SolidButton from '../../../components/controls/SolidButton';
import FVStack from '../../../components/boxes/FVStack';
import {useListDialogContext} from '../../../shared/contexts/dialogContexts/ListDialogContext';
import {useAppSelector} from '../../../store/store';
import ListSelectors from '../../../store/list/listSelectors';

const img = require('../../../../assets/images/content-1.png');
const size = 150;

const ItemListStub = () => {
  const {t} = useTranslation();
  const {showCreateDialog} = useListDialogContext();
  const groups = useAppSelector(ListSelectors.groups);

  const openCreateDialog = useCallback(() => showCreateDialog(groups), [groups]);

  return (
    <StubBox>
      <FVStack space="5" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <SolidButton colorScheme="primary" size="lg" onPress={openCreateDialog}>
          {t('list:actions.createGroupOrItem')}
        </SolidButton>
      </FVStack>
    </StubBox>
  );
};

export default ItemListStub;

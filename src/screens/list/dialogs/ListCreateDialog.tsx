import React, {memo, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import {useAppSelector} from '../../../store/store';
import {Group} from '../../../models/Group';
import FVStack from '../../../components/boxes/FVStack';
import AuthSelectors from '../../../store/auth/authSelectors';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import GhostButton from '../../../components/controls/GhostButton';
import GroupIcon from '../../../components/icons/GroupIcon';
import ItemIcon from '../../../components/icons/ItemIcon';
import {useColorModeValue} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';

export type ListCreateDialogProps = {
  groups: Group[];
  show: boolean;
  close: () => void;
  switchToCreateItem: () => void;
};

export const defaultListCreateDialogProps: Readonly<ListCreateDialogProps> = {
  groups: null,
  show: false,
  close: (): void => null,
  switchToCreateItem: (): void => null,
};

const ListCreateDialog = ({groups, show, close, switchToCreateItem}: ListCreateDialogProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const groupNavigation = useNavigation<GroupNavigationProps>();
  const fontColor = useColorModeValue('gray.600', 'gray.400');

  const goToGroupCreate = useCallback((): void => groupNavigation.navigate('GroupCreate'), []);

  const canCreateItems = useMemo<boolean>(() => {
    return groups?.map((group) => GroupUtils.canEdit(account, group)).length > 0;
  }, [groups, show]);

  const handleCreateGroupPress = (): void => {
    close();
    goToGroupCreate();
  };

  const handleCreateItemPress = (): void => {
    close();
    switchToCreateItem();
  };

  const content = (
    <FVStack space="4" alignItems="flex-start">
      <GhostButton
        width="100%"
        justifyContent="flex-start"
        size="lg"
        startIcon={<GroupIcon size="2xl" />}
        _text={{fontSize: 16, color: fontColor}}
        onPress={handleCreateGroupPress}
      >
        {t('list:create.buttons.createGroup')}
      </GhostButton>
      <GhostButton
        width="100%"
        justifyContent="flex-start"
        size="lg"
        startIcon={<ItemIcon size="2xl" />}
        _text={{fontSize: 16, color: fontColor}}
        onPress={handleCreateItemPress}
        isDisabled={!canCreateItems}
      >
        {t('list:create.buttons.createItem')}
      </GhostButton>
    </FVStack>
  );

  return <ModalDialog open={show} close={close} title={t('list:create.title')} content={content} />;
};

export default memo(ListCreateDialog);

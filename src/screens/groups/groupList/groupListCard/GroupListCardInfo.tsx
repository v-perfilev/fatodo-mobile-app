import React, {FC, memo, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {flowRight} from 'lodash';
import {Item} from '../../../../models/Item';
import {useTranslation} from 'react-i18next';
import BoxWithIcon from '../../../../components/surfaces/BoxWithIcon';
import ItemsIcon from '../../../../components/icons/ItemsIcon';
import GroupListCardAvatars from './GroupListCardAvatars';
import LinkButton from '../../../../components/controls/LinkButton';

type GroupListCardHeaderProps = {
  items: Item[];
  count: number;
};

const GroupListCardInfo: FC<GroupListCardHeaderProps> = ({items, count}) => {
  const {group} = useGroupViewContext();
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();

  const showButtonToGroupView = useMemo<boolean>(() => count !== items.length, [items, count]);
  const showButtonToCreateItem = useMemo<boolean>(() => count === 0, [count]);

  const goToGroupView = (): void => {
    navigation.navigate('GroupView', {groupId: group.id});
  };

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
  };

  return (
    <>
      <GroupListCardAvatars />
      <HStack flex="1" justifyContent="center">
        {showButtonToGroupView && <LinkButton onPress={goToGroupView}>{t('group:actions.showAll')}</LinkButton>}
        {showButtonToCreateItem && <LinkButton onPress={goToItemCreate}>{t('group:actions.createItem')}</LinkButton>}
      </HStack>
      <HStack mr="0.5">
        <BoxWithIcon icon={<ItemsIcon color="primary.500" size="sm" />}>{count || 0}</BoxWithIcon>
      </HStack>
    </>
  );
};

export default flowRight([memo])(GroupListCardInfo);

import React, {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {Item} from '../../../../models/Item';
import {useTranslation} from 'react-i18next';
import BoxWithIcon from '../../../../components/surfaces/BoxWithIcon';
import ItemsIcon from '../../../../components/icons/ItemsIcon';
import GroupListCardAvatars from './GroupListCardAvatars';
import LinkButton from '../../../../components/controls/LinkButton';
import {Group} from '../../../../models/Group';
import FHStack from '../../../../components/surfaces/FHStack';

type GroupListCardHeaderProps = {
  group: Group;
  items: Item[];
  count: number;
};

const GroupListCardInfo = ({group, items, count}: GroupListCardHeaderProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId: group.id, colorScheme: group.color});
  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {groupId: group.id, colorScheme: group.color});

  const showButtonToGroupView = useMemo<boolean>(() => count !== items.length, [items, count]);
  const showButtonToCreateItem = useMemo<boolean>(() => count === 0, [count]);

  return (
    <FHStack smallSpace h="45px" mx="0.5" alignItems="center">
      <GroupListCardAvatars group={group} />
      <FHStack grow justifyContent="center">
        {showButtonToGroupView && <LinkButton onPress={goToGroupView}>{t('group:actions.showAll')}</LinkButton>}
        {showButtonToCreateItem && <LinkButton onPress={goToItemCreate}>{t('group:actions.createItem')}</LinkButton>}
      </FHStack>
      <BoxWithIcon icon={<ItemsIcon color="primary.500" size="sm" />}>{count || 0}</BoxWithIcon>
    </FHStack>
  );
};

export default GroupListCardInfo;

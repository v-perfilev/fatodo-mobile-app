import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import {Item} from '../../../../models/Item';
import {useTranslation} from 'react-i18next';
import BoxWithIcon from '../../../../components/surfaces/BoxWithIcon';
import ItemsIcon from '../../../../components/icons/ItemsIcon';
import GroupListCardAvatars from './GroupListCardAvatars';
import LinkButton from '../../../../components/controls/LinkButton';
import {Group} from '../../../../models/Group';
import FHStack from '../../../../components/boxes/FHStack';
import CommentsIcon from '../../../../components/icons/CommentsIcon';

type GroupListCardHeaderProps = {
  group: Group;
  items: Item[];
  count: number;
};

const GroupListCardInfo = ({group, items, count}: GroupListCardHeaderProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t} = useTranslation();

  const goToGroupView = (): void => navigation.navigate('GroupView', {group});
  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {group});

  const showButtonToGroupView = count !== items.length;
  const showButtonToCreateItem = count === 0;

  return (
    <FHStack defaultSpace h="45px" px="4" my="1" alignItems="center">
      <GroupListCardAvatars group={group} />
      <FHStack grow justifyContent="center">
        {showButtonToGroupView && <LinkButton onPress={goToGroupView}>{t('group:actions.showAll')}</LinkButton>}
        {showButtonToCreateItem && <LinkButton onPress={goToItemCreate}>{t('group:actions.createItem')}</LinkButton>}
      </FHStack>
      <BoxWithIcon icon={<CommentsIcon color="primary.500" size="md" />}>{count || 0}</BoxWithIcon>
      <BoxWithIcon icon={<ItemsIcon color="primary.500" size="md" />}>{count || 0}</BoxWithIcon>
    </FHStack>
  );
};

export default GroupListCardInfo;

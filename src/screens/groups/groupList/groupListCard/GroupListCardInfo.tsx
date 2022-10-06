import React, {useCallback} from 'react';
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
import InfoSelectors from '../../../../store/info/infoSelectors';
import {useAppSelector} from '../../../../store/store';
import {RootNavigationProp} from '../../../../navigators/RootNavigator';

type GroupListCardHeaderProps = {
  group: Group;
  items: Item[];
  itemsCount: number;
};

const GroupListCardInfo = ({group, items, itemsCount}: GroupListCardHeaderProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, group.id));
  const {t} = useTranslation();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const groupNavigation = useNavigation<GroupNavigationProp>();

  const goToGroupView = (): void => groupNavigation.navigate('GroupView', {group});
  const goToItemCreate = (): void => groupNavigation.navigate('ItemCreate', {group});
  const goToComments = (): void =>
    rootNavigation.navigate('CommentList', {
      targetId: group.id,
      colorScheme: group.color,
    });

  const showButtonToGroupView = itemsCount !== items.length;
  const showButtonToCreateItem = itemsCount === 0;

  return (
    <FHStack defaultSpace h="45px" px="4" my="1" alignItems="center">
      <GroupListCardAvatars group={group} />
      <FHStack grow justifyContent="center">
        {showButtonToGroupView && <LinkButton onPress={goToGroupView}>{t('group:actions.showAll')}</LinkButton>}
        {showButtonToCreateItem && <LinkButton onPress={goToItemCreate}>{t('group:actions.createItem')}</LinkButton>}
      </FHStack>
      <BoxWithIcon icon={<ItemsIcon color="primary.500" size="md" />}>{itemsCount || 0}</BoxWithIcon>
      <BoxWithIcon icon={<CommentsIcon color="primary.500" size="md" />} onPress={goToComments}>
        {commentThread?.count || 0}
      </BoxWithIcon>
    </FHStack>
  );
};

export default GroupListCardInfo;

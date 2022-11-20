import React, {memo, useCallback} from 'react';
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
import {ProtectedNavigationProp} from '../../../../navigators/ProtectedNavigator';

type GroupListCardHeaderProps = {
  group: Group;
  items: Item[];
  itemsCount: number;
};

const GroupListCardInfo = ({group, items, itemsCount}: GroupListCardHeaderProps) => {
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, group.id));
  const {t} = useTranslation();
  const rootNavigation = useNavigation<ProtectedNavigationProp>();
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
    <FHStack space="3" h="45px" px="4" my="1" alignItems="center">
      <GroupListCardAvatars group={group} />
      <FHStack grow justifyContent="center">
        {showButtonToGroupView && (
          <LinkButton colorScheme={group.color} onPress={goToGroupView}>
            {t('group:actions.showAll')}
          </LinkButton>
        )}
        {showButtonToCreateItem && (
          <LinkButton colorScheme={group.color} onPress={goToItemCreate}>
            {t('group:actions.createItem')}
          </LinkButton>
        )}
      </FHStack>
      <BoxWithIcon icon={<ItemsIcon color={`${group.color}.500`} size="md" />} text={itemsCount || 0} />
      <BoxWithIcon
        icon={<CommentsIcon color={`${group.color}.500`} size="md" />}
        text={commentThread?.count || 0}
        onPress={goToComments}
      />
    </FHStack>
  );
};

export default memo(GroupListCardInfo);

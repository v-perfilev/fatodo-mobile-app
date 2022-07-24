import React from 'react';
import CornerButton from '../../../components/controls/CornerButton';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import GroupSelectors from '../../../store/group/groupSelectors';

const ItemViewCorner = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const group = useAppSelector(GroupSelectors.group);
  const item = useAppSelector(ItemSelectors.item);

  const goToComments = (): void => navigation.navigate('CommentList', {targetId: item.id, colorScheme: group.color});

  return <CornerButton icon={<CommentsIcon />} onPress={goToComments} />;
};

export default ItemViewCorner;

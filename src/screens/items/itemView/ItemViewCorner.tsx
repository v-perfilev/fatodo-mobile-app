import React from 'react';
import CornerButton from '../../../components/controls/CornerButton';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewCorner = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const item = useAppSelector(ItemSelectors.item);

  const goToComments = (): void => navigation.navigate('CommentsView', {targetId: item.id});

  return <CornerButton size="lg" p="3" icon={<CommentsIcon />} onPress={goToComments} />;
};

export default ItemViewCorner;

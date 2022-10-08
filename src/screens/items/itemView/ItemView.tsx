import React, {useCallback, useMemo} from 'react';
import ThemeProvider from '../../../shared/themes/ThemeProvider';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ItemViewHeader from './ItemViewHeader';
import ItemViewDescription from './ItemViewDescription';
import ItemViewChanges from './ItemViewChanges';
import ItemViewDate from './itemViewDate';
import ItemViewPriority from './itemViewPriority';
import ItemViewType from './itemViewType';
import ItemViewGroup from './itemViewGroup';
import ItemReminders from './ItemReminders';
import ItemViewName from './itemViewName';
import FVStack from '../../../components/boxes/FVStack';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import ItemSelectors from '../../../store/item/itemSelectors';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import CornerManagement from '../../../components/controls/CornerManagement';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import {CornerButton} from '../../../models/CornerButton';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import Separator from '../../../components/layouts/Separator';
import ItemViewStatus from './itemViewStatus';

type ItemViewProps = WithItemProps;

const ItemView = ({group, item, loading}: ItemViewProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const reminders = useAppSelector(ItemSelectors.reminders);
  const theme = ThemeFactory.getTheme(group?.color);

  const showReminders = reminders?.length > 0;

  const goToComments = useCallback(() => {
    navigation.navigate('CommentList', {targetId: item.id, colorScheme: group.color});
  }, [item, group]);

  const buttons = useMemo<CornerButton[]>(() => [{icon: <CommentsIcon />, action: goToComments}], [goToComments]);

  return (
    <ThemeProvider theme={theme}>
      <ItemViewHeader account={account} />
      <ConditionalSpinner loading={loading}>
        <SimpleScrollView>
          <FVStack defaultSpace>
            <ItemViewName />
            <ItemViewGroup />
            <ItemViewStatus />
            <ItemViewType />
            <ItemViewPriority />
            <ItemViewDate />
            <Separator bg="primary.500" />
            <ItemViewDescription />
            {showReminders && <Separator bg="primary.500" />}
            {showReminders && <ItemReminders />}
            <Separator bg="primary.500" />
            <ItemViewChanges />
          </FVStack>
        </SimpleScrollView>
      </ConditionalSpinner>
      <CornerManagement buttons={buttons} />
    </ThemeProvider>
  );
};
export default withItemContainer(ItemView);

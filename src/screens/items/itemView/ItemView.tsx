import React from 'react';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
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
import FHStack from '../../../components/boxes/FHStack';
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

  const goToComments = (): void => navigation.navigate('CommentList', {targetId: item.id, colorScheme: group.color});

  const buttons: CornerButton[] = [{icon: <CommentsIcon />, action: goToComments}];

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
            <Separator bg="secondary.500" />
            <ItemViewDescription />
            {showReminders && <Separator bg="secondary.500" />}
            {showReminders && <ItemReminders />}
            <Separator bg="secondary.500" />
            <ItemViewChanges />
          </FVStack>
        </SimpleScrollView>
      </ConditionalSpinner>
      <CornerManagement buttons={buttons} />
    </ThemeProvider>
  );
};

export default withItemContainer(ItemView);

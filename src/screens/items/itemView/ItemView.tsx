import React, {useMemo} from 'react';
import {Divider, ScrollView, Theme} from 'native-base';
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
import {DEFAULT_SPACE} from '../../../constants';
import {ListUtils} from '../../../shared/utils/ListUtils';
import CornerManagement from '../../../components/controls/CornerManagement';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import {CornerButton} from '../../../models/CornerButton';
import CommentsIcon from '../../../components/icons/CommentsIcon';

type ItemViewProps = WithItemProps;

const ItemView = ({group, item, loading}: ItemViewProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showReminders = reminders?.length > 0;

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  const goToComments = (): void => navigation.navigate('CommentList', {targetId: item.id, colorScheme: group.color});

  const buttons: CornerButton[] = [{icon: <CommentsIcon />, action: goToComments}];

  return (
    <ThemeProvider theme={theme}>
      <ItemViewHeader account={account} />
      <ConditionalSpinner loading={loading}>
        <ScrollView contentContainerStyle={ListUtils.containerStyle(DEFAULT_SPACE)}>
          <FVStack defaultSpace>
            <ItemViewName />
            <ItemViewGroup />
            <FHStack defaultSpace>
              <ItemViewType />
              <ItemViewPriority />
            </FHStack>
            <ItemViewDate />
            <Divider bg="secondary.500" />
            <ItemViewDescription />
            {showReminders && <Divider bg="secondary.500" />}
            {showReminders && <ItemReminders />}
            <Divider bg="secondary.500" />
            <ItemViewChanges />
          </FVStack>
        </ScrollView>
      </ConditionalSpinner>
      <CornerManagement buttons={buttons} />
    </ThemeProvider>
  );
};

export default withItemContainer(ItemView);

import React, {useMemo} from 'react';
import {Divider, Theme} from 'native-base';
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
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import ItemSelectors from '../../../store/item/itemSelectors';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';
import ItemViewCorner from './ItemViewCorner';

type ItemViewProps = WithItemProps;

const ItemView = ({group, loading}: ItemViewProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showReminders = reminders?.length > 0;

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <ItemViewHeader account={account} />
      <ItemViewCorner />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
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
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withItemContainer(ItemView);

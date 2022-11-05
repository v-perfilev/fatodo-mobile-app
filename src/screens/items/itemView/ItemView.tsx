import React, {memo, useCallback, useMemo} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import ItemViewHeader from './ItemViewHeader';
import ItemViewDescription from './ItemViewDescription';
import ItemViewChanges from './ItemViewChanges';
import ItemReminders from './ItemReminders';
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
import {useTranslation} from 'react-i18next';
import MultiLabeledBox, {MultiLabeledBoxItem} from '../../../components/surfaces/MultiLabeledBox';
import StatusView from '../../../components/views/StatusView';
import TypeView from '../../../components/views/TypeView';
import PriorityView from '../../../components/views/PriorityView';
import DateParamView from '../../../components/views/DateParamView';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';

type ItemViewProps = WithItemProps;

const ItemView = ({group, item, containerLoading}: ItemViewProps) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<RootNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showReminders = reminders?.length > 0;

  const goToComments = useCallback(() => {
    navigation.navigate('CommentList', {targetId: item.id, colorScheme: group.color});
  }, [item, group]);

  const labeledItems = useMemo<MultiLabeledBoxItem[]>(
    () =>
      item
        ? [
            {label: t('item:labels.item'), value: item.title},
            {label: t('item:labels.group'), value: group?.title},
            {label: t('item:labels.status'), value: <StatusView statusType={item.status} />},
            {label: t('item:labels.type'), value: <TypeView type={item.type} />},
            {label: t('item:labels.priority'), value: <PriorityView priority={item.priority} />},
            {label: t('item:labels.date'), value: item.date && <DateParamView date={item.date} />},
          ]
        : [],
    [item, group, i18n.language],
  );

  const buttons = useMemo<CornerButton[]>(() => [{icon: <CommentsIcon />, action: goToComments}], [goToComments]);

  return (
    <>
      <ItemViewHeader account={account} />
      <ConditionalSpinner loading={containerLoading}>
        <SimpleScrollView>
          <FVStack defaultSpace>
            <MultiLabeledBox items={labeledItems} />
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
    </>
  );
};

export default flowRight([memo, withItemContainer, withThemeProvider, memo])(ItemView);

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
import {ProtectedNavigationProps} from '../../../navigators/ProtectedNavigator';
import {CornerButton} from '../../../models/CornerManagement';
import CommentsIcon from '../../../components/icons/CommentsIcon';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import Separator from '../../../components/layouts/Separator';
import {useTranslation} from 'react-i18next';
import MultiLabeledBox, {MultiLabeledBoxItem} from '../../../components/surfaces/MultiLabeledBox';
import PriorityView from '../../../components/views/PriorityView';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import StatusView from '../../../components/views/StatusView';
import InfoSelectors from '../../../store/info/infoSelectors';

type ItemViewProps = WithItemProps;

const ItemView = ({group, item, containerLoading}: ItemViewProps) => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<ProtectedNavigationProps>();
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, item?.id));
  const account = useAppSelector(AuthSelectors.account);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showReminders = reminders?.length > 0;

  const goToComments = useCallback(() => {
    navigation.navigate('CommentList', {targetId: item.id, colorScheme: group.color});
  }, [item, group]);

  const title = useMemo<string>(() => {
    return item?.archived ? `${item?.title} (${t('item:labels.archived')})` : item?.title;
  }, [item, i18n.language]);

  const labeledItems = useMemo<MultiLabeledBoxItem[]>(
    () =>
      item
        ? [
            {label: t('item:labels.item'), value: title},
            {label: t('item:labels.group'), value: group?.title},
            {label: t('item:labels.priority'), value: <PriorityView priority={item.priority} />},
            {label: t('item:labels.status'), value: <StatusView done={item.done} />},
          ]
        : [],
    [item, group, i18n.language],
  );

  const buttons = useMemo<CornerButton[]>(
    () => [
      {
        icon: <CommentsIcon />,
        action: goToComments,
        badgeNumber: commentThread?.count,
      },
    ],
    [goToComments, commentThread],
  );

  return (
    <>
      <ItemViewHeader account={account} />
      <ConditionalSpinner loading={containerLoading}>
        <SimpleScrollView>
          <FVStack space="3">
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

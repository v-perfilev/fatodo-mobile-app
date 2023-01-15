import React, {memo, ReactElement, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/modals/ModalDialog';
import {useAppSelector} from '../../../../store/store';
import {Group} from '../../../../models/Group';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import {ScrollView} from 'native-base';
import {Dimensions, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import FlatList from '../../../../components/scrollable/FlatList';
import ListCreateItemDialogGroup from './ListCreateItemDialogGroup';

export type ListCreateItemDialogProps = {
  groups: Group[];
  show: boolean;
  close: () => void;
};

export const defaultListCreateItemDialogProps: Readonly<ListCreateItemDialogProps> = {
  groups: null,
  show: false,
  close: (): void => null,
};

const containerStyle: StyleProp<ViewStyle> = {flex: 1};

const ListCreateItemDialog = ({groups, show, close}: ListCreateItemDialogProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();
  const listHeight = useMemo<number>(() => Math.floor(Dimensions.get('window').height / 2), []);

  const enabledGroups = useMemo<Group[]>(() => {
    return groups?.filter((group) => GroupUtils.canEdit(account, group));
  }, [groups, show]);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Group>): ReactElement => <ListCreateItemDialogGroup group={info.item} close={close} />,
    [close],
  );

  const content = (
    <ScrollView maxHeight={listHeight} horizontal={true} contentContainerStyle={containerStyle}>
      <FlatList data={enabledGroups} render={renderItem} fixedLength={60} notFullHeight />
    </ScrollView>
  );

  return <ModalDialog open={show} close={close} title={t('list:createItem.title')} content={content} size="xl" />;
};

export default memo(ListCreateItemDialog);

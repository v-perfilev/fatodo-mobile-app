import React, {memo, ReactElement, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import IncomingRequestListStub from './IncomingRequestListStub';
import {Box, useTheme} from 'native-base';
import {ContactRequest} from '../../../models/Contact';
import {LayoutChangeEvent, ListRenderItemInfo} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import IncomingRequestListItem from './IncomingRequestListItem';
import CollapsableRefreshableFlatList from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {useIsFocused} from '@react-navigation/native';

const IncomingRequestList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);
  const [loading, setLoading] = useDelayedState();

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ContactsActions.fetchIncomingRequestsThunk());
  }, []);

  /*
  Key extractor and render item
   */

  const keyExtractor = useCallback((relation: ContactRequest): string => relation.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ContactRequest>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <IncomingRequestListItem request={info.item} />
      </Box>
    ),
    [],
  );

  /*
  Effects
   */

  useEffect(() => {
    isFocused && loading && refresh().finally(() => setLoading(false));
  }, [isFocused]);

  const stub = useMemo<ReactElement>(() => <IncomingRequestListStub />, []);

  return (
    <CollapsableRefreshableFlatList
      header={undefined}
      headerHeight={0}
      loading={loading}
      ListEmptyComponent={stub}
      data={incomingRequests}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    />
  );
};

export default memo(IncomingRequestList);

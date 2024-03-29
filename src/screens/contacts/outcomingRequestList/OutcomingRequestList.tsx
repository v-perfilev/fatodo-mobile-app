import React, {memo, ReactElement, useCallback, useEffect} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import OutcomingRequestListStub from './OutcomingRequestListStub';
import {Box} from 'native-base';
import {ContactRequest} from '../../../models/Contact';
import {LayoutChangeEvent, ListRenderItemInfo} from 'react-native';
import CollapsableRefreshableFlatList from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {useIsFocused} from '@react-navigation/native';
import Separator from '../../../components/layouts/Separator';
import ContactListSkeleton from '../skeletons/ContactListSkeleton';
import OutcomingRequestListItem from './OutcomingRequestListItem';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const outcomingRequestsInitialized = useAppSelector(ContactsSelectors.outcomingRequestsInitialized);
  const [loading, setLoading] = useDelayedState(!outcomingRequestsInitialized);

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsActions.fetchOutcomingRequestsThunk());
  };

  const keyExtractor = useCallback((request: ContactRequest): string => request.id || request.recipientId, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ContactRequest>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <OutcomingRequestListItem request={info.item} />
      </Box>
    ),
    [],
  );

  useEffect(() => {
    isFocused && loading && refresh().finally(() => setLoading(false));
  }, [isFocused]);

  return (
    <CollapsableRefreshableFlatList
      loading={loading}
      loadingPlaceholder={<ContactListSkeleton />}
      ListEmptyComponent={<OutcomingRequestListStub />}
      ItemSeparatorComponent={Separator}
      data={outcomingRequests}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    />
  );
};

export default memo(OutcomingRequestList);

import React, {ReactElement, useEffect} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import OutcomingRequestListStub from './OutcomingRequestListStub';
import {Box, useTheme} from 'native-base';
import {ContactRequest} from '../../../models/Contact';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import OutcomingRequestListItem from './OutcomingRequestListItem';
import CollapsableRefreshableFlatList from '../../../components/scrollable/CollapsableRefreshableFlatList';
import {useIsFocused} from '@react-navigation/native';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const theme = useTheme();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const [loading, setLoading] = useDelayedState();

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsActions.fetchOutcomingRequestsThunk());
  };

  const keyExtractor = (relation: ContactRequest): string => relation.id;
  const renderItem = (request: ContactRequest, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
    <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
      <OutcomingRequestListItem request={request} />
    </Box>
  );

  useEffect(() => {
    isFocused && loading && refresh().finally(() => setLoading(false));
  }, [isFocused]);

  return (
    <CollapsableRefreshableFlatList
      header={undefined}
      headerHeight={0}
      loading={loading}
      ListEmptyComponent={<OutcomingRequestListStub />}
      data={outcomingRequests}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    />
  );
};

export default OutcomingRequestList;

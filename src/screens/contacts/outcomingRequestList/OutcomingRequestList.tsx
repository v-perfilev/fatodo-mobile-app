import React, {ReactElement, useCallback, useEffect} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import OutcomingRequestListStub from './OutcomingRequestListStub';
import FlatList from '../../../components/surfaces/FlatList';
import {Box, useTheme} from 'native-base';
import {ContactRequest} from '../../../models/Contact';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import OutcomingRequestListItem from './OutcomingRequestListItem';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const [loading, setLoading] = useDelayedState();

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsThunks.fetchOutcomingRequests());
  };

  const keyExtractor = useCallback((relation: ContactRequest): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequest, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <OutcomingRequestListItem request={request} />
      </Box>
    ),
    [],
  );

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <FlatList
        contentContainerStyle={ListUtils.containerStyle()}
        ListEmptyComponent={<OutcomingRequestListStub />}
        data={outcomingRequests}
        render={renderItem}
        keyExtractor={keyExtractor}
        refresh={refresh}
      />
    </ConditionalSpinner>
  );
};

export default OutcomingRequestList;

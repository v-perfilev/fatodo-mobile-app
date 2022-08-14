import React, {ReactElement, useCallback, useEffect} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import IncomingRequestListStub from './IncomingRequestListStub';
import FlatList from '../../../components/surfaces/FlatList';
import {Box, useTheme} from 'native-base';
import {ContactRequest} from '../../../models/Contact';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import IncomingRequestListItem from './IncomingRequestListItem';

const IncomingRequestList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);
  const [loading, setLoading] = useDelayedState();

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsThunks.fetchIncomingRequests());
  };

  /*
  Key extractor and render item
   */

  const keyExtractor = useCallback((relation: ContactRequest): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequest, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <IncomingRequestListItem request={request} />
      </Box>
    ),
    [],
  );

  /*
  Effects
   */

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <FlatList
        contentContainerStyle={ListUtils.containerStyle()}
        ListEmptyComponent={<IncomingRequestListStub />}
        data={incomingRequests}
        render={renderItem}
        keyExtractor={keyExtractor}
        refresh={refresh}
      />
    </ConditionalSpinner>
  );
};

export default IncomingRequestList;

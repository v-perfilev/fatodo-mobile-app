import React, {ReactElement, useCallback} from 'react';
import IncomingRequestListStub from './IncomingRequestListStub';
import IncomingRequestListItem from './IncomingRequestListItem';
import {Box, useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useAppDispatch} from '../../../store/store';
import {ContactRequest} from '../../../models/Contact';

type IncomingRequestListContainerProps = {
  requests: ContactRequest[];
};

const IncomingRequestListContainer = ({requests}: IncomingRequestListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsThunks.fetchIncomingRequests());
  };

  const keyExtractor = useCallback((relation: ContactRequest): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequest, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <IncomingRequestListItem request={request} />
      </Box>
    ),
    [],
  );

  return (
    <FlatList
      ListEmptyComponent={<IncomingRequestListStub />}
      data={requests}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    />
  );
};
export default IncomingRequestListContainer;

import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListStub from './IncomingRequestListStub';
import IncomingRequestListItem from './IncomingRequestListItem';
import {useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useAppDispatch} from '../../../store/store';

type IncomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const IncomingRequestListItems = ({requests}: IncomingRequestListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const refresh = (): Promise<any> => {
    return dispatch(ContactsThunks.fetchIncomingRequests());
  };

  const keyExtractor = useCallback((relation: ContactRequestWithUser): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequestWithUser, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
      return <IncomingRequestListItem onLayout={onLayout} request={request} style={ListUtils.itemStyle(theme)} />;
    },
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

export default IncomingRequestListItems;

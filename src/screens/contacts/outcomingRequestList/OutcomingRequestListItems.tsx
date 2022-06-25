import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import OutcomingRequestListItem from './OutcomingRequestListItem';
import {useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import IncomingRequestListStub from '../incomingRequestList/IncomingRequestListStub';
import FlatList from '../../../components/surfaces/FlatList';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useAppDispatch} from '../../../store/store';

type OutcomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const OutcomingRequestListItems = ({requests}: OutcomingRequestListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const refresh = (): Promise<any> => {
    return dispatch(ContactsThunks.fetchOutcomingRequests());
  };

  const keyExtractor = useCallback((relation: ContactRequestWithUser): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequestWithUser, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
      return <OutcomingRequestListItem onLayout={onLayout} request={request} style={ListUtils.itemStyle(theme)} />;
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

export default OutcomingRequestListItems;

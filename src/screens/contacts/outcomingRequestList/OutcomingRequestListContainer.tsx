import React, {ReactElement, useCallback} from 'react';
import OutcomingRequestListItem from './OutcomingRequestListItem';
import {Box, useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useAppDispatch} from '../../../store/store';
import OutcomingRequestListStub from './OutcomingRequestListStub';
import {ContactRequest} from '../../../models/Contact';

type OutcomingRequestListContainerProps = {
  requests: ContactRequest[];
};

const OutcomingRequestListContainer = ({requests}: OutcomingRequestListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsThunks.fetchOutcomingRequests());
  };

  const keyExtractor = useCallback((relation: ContactRequest): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequest, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <OutcomingRequestListItem request={request} />
      </Box>
    ),
    [],
  );

  return (
    <FlatList
      ListEmptyComponent={<OutcomingRequestListStub />}
      data={requests}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    />
  );
};

export default OutcomingRequestListContainer;

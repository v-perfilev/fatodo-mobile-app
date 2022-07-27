import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListStub from './IncomingRequestListStub';
import IncomingRequestListItem from './IncomingRequestListItem';
import {Box, useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';

type IncomingRequestListContainerProps = {
  load: () => Promise<void>;
  requests: ContactRequestWithUser[];
};

const IncomingRequestListContainer = ({load, requests}: IncomingRequestListContainerProps) => {
  const theme = useTheme();

  const keyExtractor = useCallback((relation: ContactRequestWithUser): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequestWithUser, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
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
      refresh={load}
    />
  );
};
export default IncomingRequestListContainer;

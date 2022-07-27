import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import OutcomingRequestListItem from './OutcomingRequestListItem';
import {Box, useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import IncomingRequestListStub from '../incomingRequestList/IncomingRequestListStub';
import FlatList from '../../../components/surfaces/FlatList';

type OutcomingRequestListContainerProps = {
  load: () => Promise<void>;
  requests: ContactRequestWithUser[];
};

const OutcomingRequestListContainer = ({load, requests}: OutcomingRequestListContainerProps) => {
  const theme = useTheme();

  const keyExtractor = useCallback((relation: ContactRequestWithUser): string => relation.id, []);
  const renderItem = useCallback(
    (request: ContactRequestWithUser, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <OutcomingRequestListItem request={request} />
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

export default OutcomingRequestListContainer;

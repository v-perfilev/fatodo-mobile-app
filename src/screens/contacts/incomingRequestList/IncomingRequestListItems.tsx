import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListStub from './IncomingRequestListStub';
import IncomingRequestListItem from './IncomingRequestListItem';
import {useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';

type IncomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const IncomingRequestListItems = ({requests}: IncomingRequestListContainerProps) => {
  const theme = useTheme();

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
      renderItemWithLayout={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default IncomingRequestListItems;

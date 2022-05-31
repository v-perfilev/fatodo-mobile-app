import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import IncomingRequestListStub from './IncomingRequestListStub';
import IncomingRequestListItem from './IncomingRequestListItem';
import {FlatList, useTheme} from 'native-base';
import {ListRenderItemInfo} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';

type IncomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const IncomingRequestListItems = ({requests}: IncomingRequestListContainerProps) => {
  const theme = useTheme();

  const keyExtractor = useCallback((relation: ContactRequestWithUser): string => relation.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<ContactRequestWithUser>): ReactElement => {
    return <IncomingRequestListItem request={info.item} style={ListUtils.itemStyle(theme)} />;
  }, []);

  return (
    <FlatList
      ListEmptyComponent={<IncomingRequestListStub />}
      data={requests}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={ListUtils.containerStyle(theme)}
    />
  );
};

export default IncomingRequestListItems;

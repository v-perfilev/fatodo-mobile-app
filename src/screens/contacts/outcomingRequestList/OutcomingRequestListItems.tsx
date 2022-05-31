import React, {ReactElement, useCallback} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import OutcomingRequestListItem from './OutcomingRequestListItem';
import {FlatList, useTheme} from 'native-base';
import {ListRenderItemInfo} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import IncomingRequestListStub from '../incomingRequestList/IncomingRequestListStub';

type OutcomingRequestListContainerProps = {
  requests: ContactRequestWithUser[];
};

const OutcomingRequestListItems = ({requests}: OutcomingRequestListContainerProps) => {
  const theme = useTheme();

  const keyExtractor = useCallback((relation: ContactRequestWithUser): string => relation.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<ContactRequestWithUser>): ReactElement => {
    return <OutcomingRequestListItem request={info.item} style={ListUtils.itemStyle(theme)} />;
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

export default OutcomingRequestListItems;

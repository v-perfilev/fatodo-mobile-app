import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import ContactListStub from './ContactListStub';
import ContactListItem from './ContactListItem';
import {FlatList, useTheme} from 'native-base';
import {ListRenderItemInfo} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';

type ContactListContainerProps = {
  relations: ContactRelationWithUser[];
  filter: string;
};

const ContactListItems = ({relations, filter}: ContactListContainerProps) => {
  const theme = useTheme();
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);

  const keyExtractor = useCallback((relation: ContactRelationWithUser): string => relation.id, []);
  const renderItem = useCallback((info: ListRenderItemInfo<ContactRelationWithUser>): ReactElement => {
    return <ContactListItem relation={info.item} style={ListUtils.itemStyle(theme)} />;
  }, []);

  useEffect(() => {
    const filteredRelations = relations.filter((r) => {
      const str = r.user.username + r.user.firstname + r.user.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  return (
    <FlatList
      ListEmptyComponent={<ContactListStub />}
      data={relationsToShow}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={ListUtils.containerStyle(theme)}
    />
  );
};

export default ContactListItems;

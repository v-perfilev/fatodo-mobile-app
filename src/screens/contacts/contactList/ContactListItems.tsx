import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import ContactListStub from './ContactListStub';
import ContactListItem from './ContactListItem';
import {useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';

type ContactListContainerProps = {
  relations: ContactRelationWithUser[];
  filter: string;
};

const ContactListItems = ({relations, filter}: ContactListContainerProps) => {
  const theme = useTheme();
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);

  const keyExtractor = useCallback((relation: ContactRelationWithUser): string => relation.id, []);
  const renderItem = useCallback(
    (relation: ContactRelationWithUser, onLayout: (event: LayoutChangeEvent) => void): ReactElement => {
      return <ContactListItem onLayout={onLayout} relation={relation} style={ListUtils.itemStyle(theme)} />;
    },
    [],
  );

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
      renderItemWithLayout={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default ContactListItems;

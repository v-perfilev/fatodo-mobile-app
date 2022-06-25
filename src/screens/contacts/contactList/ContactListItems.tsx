import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import ContactListStub from './ContactListStub';
import ContactListItem from './ContactListItem';
import {useTheme} from 'native-base';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import FlatList from '../../../components/surfaces/FlatList';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useAppDispatch} from '../../../store/store';

type ContactListContainerProps = {
  relations: ContactRelationWithUser[];
  filter: string;
};

const ContactListItems = ({relations, filter}: ContactListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);

  const refresh = (): Promise<any> => {
    return dispatch(ContactsThunks.fetchRelations());
  };

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
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    />
  );
};

export default ContactListItems;

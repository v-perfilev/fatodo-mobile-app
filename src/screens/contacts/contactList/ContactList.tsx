import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactListControl from './ContactListControl';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import ContactListStub from './ContactListStub';
import {Box, useTheme} from 'native-base';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import {LayoutChangeEvent} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ContactListItem from './ContactListItem';
import CollapsableRefreshableFlatList from '../../../components/scrollable/CollapsableRefreshableFlatList';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {showContactRequestDialog} = useContactDialogContext();
  const relations = useAppSelector(ContactsSelectors.relations);
  const users = useAppSelector(InfoSelectors.users);
  const [loading, setLoading] = useDelayedState();
  const [filter, setFilter] = useState<string>('');
  const [relationsToShow, setRelationsToShow] = useState<ContactRelation[]>([]);

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsThunks.fetchRelations());
  };

  /*
  Key extractor and render item
   */

  const keyExtractor = useCallback((relation: ContactRelation): string => relation.id, []);
  const renderItem = useCallback(
    (relation: ContactRelation, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
        <ContactListItem relation={relation} />
      </Box>
    ),
    [],
  );

  /*
  Effects
   */

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredRelations = relations.filter((r) => {
      const user = users.get(r.secondUserId);
      const str = user?.username + user?.firstname + user?.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  return (
    <CollapsableRefreshableFlatList
      header={undefined}
      headerHeight={0}
      previousNode={<ContactListControl setFilter={setFilter} />}
      loading={loading}
      ListEmptyComponent={<ContactListStub />}
      data={relationsToShow}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    >
      <CornerButton icon={<PlusIcon />} onPress={openContactRequestDialog} />
    </CollapsableRefreshableFlatList>
  );
};

export default ContactList;

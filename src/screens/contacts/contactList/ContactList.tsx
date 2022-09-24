import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactListControl from './ContactListControl';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import ContactListStub from './ContactListStub';
import {Box} from 'native-base';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import {LayoutChangeEvent, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';
import ContactListItem from './ContactListItem';
import CollapsableRefreshableFlatList from '../../../components/scrollable/CollapsableRefreshableFlatList';
import CornerManagement from '../../../components/controls/CornerManagement';
import {CornerButton} from '../../../models/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useIsFocused} from '@react-navigation/native';
import Separator from '../../../components/layouts/Separator';

const loaderStyle: StyleProp<ViewStyle> = {paddingBottom: 50};

const ContactList = () => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {showContactRequestDialog} = useContactDialogContext();
  const relations = useAppSelector(ContactsSelectors.relations);
  const userIds = relations.map((r) => r.secondUserId);
  const users = useAppSelector((state) => usersSelector(state, userIds));
  const [loading, setLoading] = useDelayedState();
  const [filter, setFilter] = useState<string>('');
  const [relationsToShow, setRelationsToShow] = useState<ContactRelation[]>([]);

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ContactsActions.fetchRelationsThunk());
  }, []);

  /*
  Key extractor and render item
   */

  const keyExtractor = useCallback((relation: ContactRelation): string => relation.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ContactRelation>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout}>
        <ContactListItem relation={info.item} />
      </Box>
    ),
    [],
  );

  /*
  Effects
   */

  useEffect(() => {
    isFocused && loading && refresh().finally(() => setLoading(false));
  }, [isFocused]);

  useEffect(() => {
    const filteredRelations = relations.filter((r) => {
      const user = users.find((u) => u.id === r.secondUserId);
      const str = user?.username + user?.firstname + user?.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  const buttons: CornerButton[] = [{icon: <PlusIcon />, action: openContactRequestDialog}];

  return (
    <CollapsableRefreshableFlatList
      loaderStyle={loaderStyle}
      previousNode={<ContactListControl setFilter={setFilter} />}
      loading={loading}
      ListEmptyComponent={<ContactListStub />}
      ItemSeparatorComponent={Separator}
      data={relationsToShow}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    >
      <CornerManagement buttons={buttons} />
    </CollapsableRefreshableFlatList>
  );
};

export default ContactList;

import React, {memo, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactListControl from './ContactListControl';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import ContactListStub from './ContactListStub';
import {Box, useTheme} from 'native-base';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import {LayoutChangeEvent, ListRenderItemInfo} from 'react-native';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ContactListItem from './ContactListItem';
import CollapsableRefreshableFlatList from '../../../components/scrollable/CollapsableRefreshableFlatList';
import CornerManagement from '../../../components/controls/CornerManagement';
import {CornerButton} from '../../../models/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import {useIsFocused} from '@react-navigation/native';

const ContactList = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
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

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ContactsActions.fetchRelationsThunk());
  }, []);

  /*
  Key extractor and render item
   */

  const keyExtractor = useCallback((relation: ContactRelation): string => relation.id, []);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<ContactRelation>, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.themedItemStyle(theme)}>
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
      const user = users.get(r.secondUserId);
      const str = user?.username + user?.firstname + user?.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  const previousNode = useMemo<ReactElement>(() => <ContactListControl setFilter={setFilter} />, []);

  const stub = useMemo<ReactElement>(() => <ContactListStub />, []);

  const buttons: CornerButton[] = [{icon: <PlusIcon />, action: openContactRequestDialog}];

  return (
    <CollapsableRefreshableFlatList
      header={undefined}
      headerHeight={0}
      previousNode={previousNode}
      previousNodeHeight={50}
      loading={loading}
      ListEmptyComponent={stub}
      data={relationsToShow}
      render={renderItem}
      keyExtractor={keyExtractor}
      refresh={refresh}
    >
      <CornerManagement buttons={buttons} />
    </CollapsableRefreshableFlatList>
  );
};

export default memo(ContactList);

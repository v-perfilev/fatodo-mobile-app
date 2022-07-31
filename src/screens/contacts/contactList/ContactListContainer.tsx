import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import FBox from '../../../components/boxes/FBox';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import ContactListStub from './ContactListStub';
import FlatList from '../../../components/surfaces/FlatList';
import {LayoutChangeEvent} from 'react-native';
import {Box, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ContactListItem from './ContactListItem';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';

type ContactListContainerProps = {
  relations: ContactRelation[];
  filter: string;
};

const CommentListContainer = ({relations, filter}: ContactListContainerProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {showContactRequestDialog} = useContactDialogContext();
  const users = useAppSelector(InfoSelectors.users);
  const [relationsToShow, setRelationsToShow] = useState<ContactRelation[]>([]);

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsThunks.fetchRelations());
  };

  const keyExtractor = useCallback((relation: ContactRelation): string => relation.id, []);
  const renderItem = useCallback(
    (relation: ContactRelation, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <ContactListItem relation={relation} />
      </Box>
    ),
    [],
  );

  useEffect(() => {
    const filteredRelations = relations.filter((r) => {
      const user = users.get(r.secondUserId);
      const str = user?.username + user?.firstname + user?.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  return (
    <FBox>
      <CornerButton icon={<PlusIcon />} onPress={openContactRequestDialog} />
      <FlatList
        ListEmptyComponent={<ContactListStub />}
        data={relationsToShow}
        render={renderItem}
        keyExtractor={keyExtractor}
        refresh={refresh}
      />
    </FBox>
  );
};

export default memo(CommentListContainer);

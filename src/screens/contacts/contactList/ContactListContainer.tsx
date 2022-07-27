import React, {memo, ReactElement, useCallback, useEffect, useState} from 'react';
import FBox from '../../../components/boxes/FBox';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';
import ContactListStub from './ContactListStub';
import FlatList from '../../../components/surfaces/FlatList';
import {LayoutChangeEvent} from 'react-native';
import {Box, useTheme} from 'native-base';
import {ListUtils} from '../../../shared/utils/ListUtils';
import ContactListItem from './ContactListItem';

type ContactListContainerProps = {
  load: () => Promise<void>;
  relations: ContactRelationWithUser[];
  filter: string;
};

const CommentListContainer = ({load, relations, filter}: ContactListContainerProps) => {
  const theme = useTheme();
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);
  const {showContactRequestDialog} = useContactDialogContext();

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  const keyExtractor = useCallback((relation: ContactRelationWithUser): string => relation.id, []);
  const renderItem = useCallback(
    (relation: ContactRelationWithUser, onLayout: (event: LayoutChangeEvent) => void): ReactElement => (
      <Box onLayout={onLayout} style={ListUtils.itemStyle(theme)}>
        <ContactListItem relation={relation} />
      </Box>
    ),
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
    <FBox>
      <CornerButton icon={<PlusIcon />} onPress={openContactRequestDialog} />
      <FlatList
        ListEmptyComponent={<ContactListStub />}
        data={relationsToShow}
        render={renderItem}
        keyExtractor={keyExtractor}
        refresh={load}
      />
    </FBox>
  );
};

export default memo(CommentListContainer);

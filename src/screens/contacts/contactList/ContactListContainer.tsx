import React, {memo} from 'react';
import FBox from '../../../components/boxes/FBox';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import ContactListItems from './ContactListItems';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import CornerButton from '../../../components/controls/CornerButton';
import PlusIcon from '../../../components/icons/PlusIcon';

type ContactListContainerProps = {
  relations: ContactRelationWithUser[];
  filter: string;
};

const CommentListContainer = ({relations, filter}: ContactListContainerProps) => {
  const {showContactRequestDialog} = useContactDialogContext();

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  return (
    <FBox>
      <CornerButton icon={<PlusIcon />} onPress={openContactRequestDialog} />
      <ContactListItems relations={relations} filter={filter} />
    </FBox>
  );
};

export default memo(CommentListContainer);

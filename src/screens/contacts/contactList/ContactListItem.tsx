import React, {useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import ControlMenu from '../../../components/layouts/ControlMenu';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

type ContactListItemProps = {
  relation: ContactRelationWithUser;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.removeRelation(relation.user.id))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuElements = [
    {
      action: removeRelation,
      icon: <UserMinusIcon />,
      color: 'error',
      disabled: disabled,
    },
  ] as MenuElement[];

  return (
    <FHStack defaultSpace alignItems="center">
      <FHStack grow>
        <UserView user={relation.user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default ContactListItem;

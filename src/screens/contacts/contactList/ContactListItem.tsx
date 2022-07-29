import React, {useMemo, useState} from 'react';
import {ContactRelation} from '../../../models/ContactRelation';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import ControlMenu from '../../../components/layouts/ControlMenu';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {User} from '../../../models/User';
import InfoSelectors from '../../../store/info/infoSelectors';

type ContactListItemProps = {
  relation: ContactRelation;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(InfoSelectors.users);
  const [disabled, setDisabled] = useState(false);

  const user = useMemo<User>(() => users.get(relation.secondUserId), [users]);

  const removeRelation = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.removeRelation(relation.secondUserId))
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
        <UserView user={user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default ContactListItem;

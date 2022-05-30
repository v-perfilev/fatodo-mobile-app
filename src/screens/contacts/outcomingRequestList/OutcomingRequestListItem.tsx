import React, {useState} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import FHStack from '../../../components/boxes/FHStack';
import UserView from '../../../components/views/UserView';
import {useAppDispatch} from '../../../store/store';
import ContactsThunks from '../../../store/contacts/contactsThunks';
import {MenuElement} from '../../../models/MenuElement';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';

type OutcomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const OutcomingRequestListItem = ({request}: OutcomingRequestListItemProps) => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  const removeRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.removeOutcomingRequest(request.user.id))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuElements = [
    {
      action: removeRequest,
      icon: <UserMinusIcon />,
      color: 'error',
      disabled: disabled,
    },
  ] as MenuElement[];

  return (
    <FHStack defaultSpace>
      <FHStack grow>
        <UserView user={request.user} withUsername picSize="sm" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default OutcomingRequestListItem;

import React, {useState} from 'react';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useAppDispatch} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {ContactsThunks} from '../../../store/contacts/contactsActions';

type IncomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const IncomingRequestListItem = ({request}: IncomingRequestListItemProps) => {
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.acceptIncomingRequest(request.user.id))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const declineRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.declineIncomingRequest(request.user.id))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuElements = [
    {
      action: acceptRequest,
      icon: <CheckIcon />,
      disabled: disabled,
    },
    {
      action: declineRequest,
      icon: <CloseIcon />,
      color: 'error',
      disabled: disabled,
    },
  ] as MenuElement[];

  return (
    <FHStack defaultSpace alignItems="center">
      <FHStack grow>
        <UserView user={request.user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default IncomingRequestListItem;

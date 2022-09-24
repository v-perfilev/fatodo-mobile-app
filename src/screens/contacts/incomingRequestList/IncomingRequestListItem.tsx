import React, {useCallback, useState} from 'react';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import CheckIcon from '../../../components/icons/CheckIcon';
import CloseIcon from '../../../components/icons/CloseIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRequest} from '../../../models/Contact';

type IncomingRequestListItemProps = {
  request: ContactRequest;
};

const IncomingRequestListItem = ({request}: IncomingRequestListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => userSelector(state, request.requesterId));
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.acceptIncomingRequestThunk(request.requesterId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const declineRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.declineIncomingRequestThunk(request.requesterId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuElements: MenuElement[] = [
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
  ];

  return (
    <FHStack grow px="2" py="4" defaultSpace alignItems="center">
      <FHStack grow>
        <UserView user={user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default IncomingRequestListItem;

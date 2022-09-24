import React, {useCallback, useState} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import UserView from '../../../components/views/UserView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRequest} from '../../../models/Contact';

type OutcomingRequestListItemProps = {
  request: ContactRequest;
};

const OutcomingRequestListItem = ({request}: OutcomingRequestListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => userSelector(state, request.recipientId));
  const [disabled, setDisabled] = useState(false);

  const removeRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsActions.removeOutcomingRequestThunk(request.recipientId))
      .unwrap()
      .catch(() => setDisabled(false));
  };

  const menuElements: MenuElement[] = [
    {
      action: removeRequest,
      icon: <UserMinusIcon />,
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

export default OutcomingRequestListItem;

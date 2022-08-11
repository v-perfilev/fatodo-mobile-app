import React, {useMemo, useState} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import UserView from '../../../components/views/UserView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {IBoxProps} from 'native-base';
import {User} from '../../../models/User';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRequest} from '../../../models/Contact';

type OutcomingRequestListItemProps = IBoxProps & {
  request: ContactRequest;
};

const OutcomingRequestListItem = ({request, ...props}: OutcomingRequestListItemProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(InfoSelectors.users);
  const [disabled, setDisabled] = useState(false);

  const user = useMemo<User>(() => users.get(request.recipientId), [users]);

  const removeRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.removeOutcomingRequest(request.recipientId))
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
    <FHStack defaultSpace alignItems="center" {...props}>
      <FHStack grow>
        <UserView user={user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default OutcomingRequestListItem;

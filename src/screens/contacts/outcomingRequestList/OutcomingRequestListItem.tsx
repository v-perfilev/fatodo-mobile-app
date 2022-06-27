import React, {useState} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import FHStack from '../../../components/boxes/FHStack';
import UserView from '../../../components/views/UserView';
import {useAppDispatch} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import ControlMenu from '../../../components/layouts/ControlMenu';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {IBoxProps} from 'native-base';

type OutcomingRequestListItemProps = IBoxProps & {
  request: ContactRequestWithUser;
};

const OutcomingRequestListItem = ({request, ...props}: OutcomingRequestListItemProps) => {
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
    <FHStack defaultSpace alignItems="center" {...props}>
      <FHStack grow>
        <UserView user={request.user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default OutcomingRequestListItem;

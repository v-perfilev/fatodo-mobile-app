import React, {useCallback} from 'react';
import UserView from '../../../components/views/UserView';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import {MenuElement} from '../../../models/MenuElement';
import ControlMenu from '../../../components/layouts/ControlMenu';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';

type ContactListItemProps = {
  relation: ContactRelation;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {showContactRemoveDialog} = useContactDialogContext();
  const user = useAppSelector((state) => userSelector(state, relation.secondUserId));

  const showRemoveDialog = (): void => {
    showContactRemoveDialog(user);
  };

  const menuElements: MenuElement[] = [
    {
      action: showRemoveDialog,
      icon: <UserMinusIcon />,
      color: 'error',
    },
  ];

  return (
    <FHStack grow px="3" py="2" space="3" alignItems="center">
      <FHStack grow>
        <UserView user={user} withUsername picSize="md" />
      </FHStack>
      <ControlMenu menu={menuElements} />
    </FHStack>
  );
};

export default ContactListItem;

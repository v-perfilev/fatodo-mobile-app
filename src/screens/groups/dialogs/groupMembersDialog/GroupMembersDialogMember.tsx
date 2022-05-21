import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupUser} from '../../../../models/Group';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ItemService from '../../../../services/ItemService';
import ConfirmationDialog from '../../../../components/modals/ConfirmationDialog';
import EditIcon from '../../../../components/icons/EditIcon';
import UserView from '../../../../components/views/UserView';
import UserMinusIcon from '../../../../components/icons/UserMinusIcon';
import {PermissionView} from '../../../../components/views/PermissionView';
import {MenuElement} from '../../../../models/MenuElement';
import ControlMenu from '../../../../components/layouts/ControlMenu';
import FHStack from '../../../../components/surfaces/FHStack';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';

type Props = {
  group: Group;
  user: GroupUser;
  switchToEditMember: (user: GroupUser) => void;
  onDelete: (userId: string) => void;
};

const GroupMembersDialogMember = ({group, user, switchToEditMember, onDelete}: Props) => {
  const account = useAppSelector(AuthSelectors.accountSelector);
  const {t} = useTranslation();
  const [showRemovingConfirmation, setShowRemovingConfirmation] = useState(false);
  const [removingLoading, setRemovingLoading] = useState(false);

  const switchToEdit = (): void => {
    switchToEditMember(user);
  };

  const switchRemovingConfirmation = (): void => {
    setShowRemovingConfirmation((prevState) => !prevState);
  };

  const canAdmin = group && GroupUtils.canAdmin(account, group);
  const canLeave = group && GroupUtils.canLeave(account, group);

  const removeUserFromChat = (): void => {
    setRemovingLoading(true);
    ItemService.removeMembersFromGroup(group.id, [user.id])
      .then(() => {
        onDelete(user.id);
      })
      .finally(() => {
        setRemovingLoading(false);
        setShowRemovingConfirmation(false);
      });
  };

  const removingConfirmation = (
    <ConfirmationDialog
      open={showRemovingConfirmation}
      title={t('group:removeMember.title')}
      content={t('group:removeMember.text', {username: user.username})}
      onAgree={removeUserFromChat}
      onDisagree={switchRemovingConfirmation}
      loading={removingLoading}
    />
  );

  const menuElements = [
    {
      action: switchToEdit,
      icon: <EditIcon />,
      hidden: !canAdmin || (user.id === account.id && !canLeave),
    },
    {
      action: switchRemovingConfirmation,
      icon: <UserMinusIcon />,
      color: 'error',
      hidden: !canAdmin || user.id === account.id,
    },
  ] as MenuElement[];

  return (
    <FHStack>
      <FHStack alignItems="center">
        <UserView user={user} withUsername withUserPic picSize="sm" />
        <PermissionView permission={user.permission} />
      </FHStack>
      <ControlMenu menu={menuElements} />
      {removingConfirmation}
    </FHStack>
  );
};

export default GroupMembersDialogMember;

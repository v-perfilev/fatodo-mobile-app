import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupUser} from '../../../../models/Group';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ConfirmationDialog from '../../../../components/modals/ConfirmationDialog';
import EditIcon from '../../../../components/icons/EditIcon';
import UserView from '../../../../components/views/UserView';
import UserMinusIcon from '../../../../components/icons/UserMinusIcon';
import {PermissionView} from '../../../../components/views/PermissionView';
import {MenuElement} from '../../../../models/MenuElement';
import ControlMenu from '../../../../components/layouts/ControlMenu';
import FHStack from '../../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {GroupThunks} from '../../../../store/group/groupActions';

type Props = {
  group: Group;
  user: GroupUser;
  switchToEditMember: (user: GroupUser) => void;
  onDelete: (userId: string) => void;
};

const GroupMembersDialogMember = ({group, user, switchToEditMember, onDelete}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
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
    dispatch(GroupThunks.removeGroupMembers({group, userIds: [user.userId]}))
      .unwrap()
      .then(() => {
        onDelete(user.userId);
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
      hidden: !canAdmin || (user.userId === account.id && !canLeave),
    },
    {
      action: switchRemovingConfirmation,
      icon: <UserMinusIcon />,
      color: 'error',
      hidden: !canAdmin || user.userId === account.id,
    },
  ] as MenuElement[];

  return (
    <FHStack>
      <FHStack grow smallSpace alignItems="center">
        <UserView user={user} withUsername withUserPic picSize="sm" />
        <PermissionView permission={user.permission} />
      </FHStack>
      <ControlMenu menu={menuElements} />
      {removingConfirmation}
    </FHStack>
  );
};

export default GroupMembersDialogMember;

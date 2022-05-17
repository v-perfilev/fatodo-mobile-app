import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ReduxAuthState} from '../../../../store/rerducers/AuthReducer';
import {Group, GroupUser} from '../../../../models/Group';
import {useSnackContext} from '../../../../shared/contexts/SnackContext';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ItemService from '../../../../services/ItemService';
import ConfirmationDialog from '../../../../components/modals/ConfirmationDialog';
import EditIcon from '../../../../components/icons/EditIcon';
import {flowRight} from 'lodash';
import withAuthState from '../../../../shared/hocs/withAuthState';
import UserView from '../../../../components/views/UserView';
import UserMinusIcon from '../../../../components/icons/UserMinusIcon';
import {PermissionView} from '../../../../components/views/PermissionView';
import {MenuElement} from '../../../../models/MenuElement';
import ControlMenu from '../../../../components/layouts/ControlMenu';
import FHStack from '../../../../components/surfaces/FHStack';

type Props = ReduxAuthState & {
  group: Group;
  user: GroupUser;
  switchToEditMember: (user: GroupUser) => void;
  onDelete: (userId: string) => void;
};

const GroupMembersDialogMember = ({group, user, switchToEditMember, onDelete, account}: Props) => {
  const {handleResponse} = useSnackContext();
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
      .catch(({response}) => {
        handleResponse(response);
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

export default flowRight([withAuthState])(GroupMembersDialogMember);

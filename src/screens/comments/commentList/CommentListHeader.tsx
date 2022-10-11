import React from 'react';
import Header from '../../../components/layouts/Header';
import Menu, {MenuItem, MenuItemProps} from '../../../components/controls/Menu';
import DotsVerticalIcon from '../../../components/icons/DotsVerticalIcon';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import IconButton from '../../../components/controls/IconButton';
import RefreshIcon from '../../../components/icons/RefreshIcon';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';

const CommentListHeader = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const refresh = (): void => {
    targetId && dispatch(CommentsActions.refreshCommentsThunk(targetId));
  };

  const menuItems: MenuItemProps[] = [
    {action: refresh, icon: <RefreshIcon color="primary.500" />, text: t('comment:menu.refresh')},
  ];

  return (
    <Header>
      <Menu trigger={(triggerProps) => <IconButton {...triggerProps} size="2xl" icon={<DotsVerticalIcon />} />}>
        {menuItems.map((itemProps, index) => (
          <MenuItem {...itemProps} key={index} />
        ))}
      </Menu>
    </Header>
  );
};

export default CommentListHeader;

import React, {useEffect} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import withEventComment, {WithEventCommentProps} from '../../../../shared/hocs/withEvents/withEventComment';
import UserReactionView from '../../../views/UserReactionView';
import UserLink from '../../../links/UserLink';
import ItemLink from '../../../links/ItemLink';
import GroupLink from '../../../links/GroupLink';
import NotificationTemplate from '../../NotificationTemplate';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProps} from '../../../../navigators/ProtectedNavigator';

const NotificationCommentReaction = ({user, group, item, reaction}: WithEventCommentProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<ProtectedNavigationProps>();
  const {t} = useTranslation();

  const goToComments = (): void =>
    navigation.navigate('CommentList', {
      targetId: group?.id || item?.id,
    });

  const title = t('event:comment.reaction.title');

  const image = <UserReactionView user={user} size="sm" reactionType={reaction} />;

  const context = user?.gender;

  let content = null;

  if (item) {
    content = (
      <Trans
        i18nKey="event:comment.reaction.contentWithItem"
        context={context}
        components={{user: <UserLink user={user} noLink />, item: <ItemLink item={item} noLink />}}
      />
    );
  } else if (group) {
    content = (
      <Trans
        i18nKey="event:comment.reaction.contentWithGroup"
        context={context}
        components={{user: <UserLink user={user} noLink />, group: <GroupLink group={group} noLink />}}
      />
    );
  }

  useEffect(() => {
    const ready = user && (group || item);
    ready && setReady(true);
  }, [user, group, item]);

  return <NotificationTemplate image={image} title={title} content={content} onClick={goToComments} />;
};

export default withEventComment(NotificationCommentReaction);

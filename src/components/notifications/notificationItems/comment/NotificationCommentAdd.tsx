import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import withEventComment, {WithEventCommentProps} from '../../../../shared/hocs/withEvents/withEventComment';
import UserView from '../../../views/UserView';
import NotificationTemplate from '../../NotificationTemplate';
import {Text} from 'native-base';
import {useNotificationContext} from '../../../../shared/contexts/NotificationContext';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProp} from '../../../../navigators/ProtectedNavigator';

const NotificationCommentAdd = ({user, group, item, comment}: WithEventCommentProps) => {
  const {setReady} = useNotificationContext();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const {t} = useTranslation();

  const goToComments = (): void =>
    navigation.navigate('CommentList', {
      targetId: group?.id || item?.id,
    });

  const image = <UserView user={user} picSize="sm" />;

  const title = t('event:comment.add.title');

  const author = user?.username;

  const content = <Text>{comment?.text}</Text>;

  useEffect(() => {
    const ready = user && (group || item) && comment;
    ready && setReady(true);
  }, [user, group, item, comment]);

  return <NotificationTemplate image={image} title={title} author={author} content={content} onClick={goToComments} />;
};

export default withEventComment(NotificationCommentAdd);

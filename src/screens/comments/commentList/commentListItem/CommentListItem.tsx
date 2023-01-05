import {Comment} from '../../../../models/Comment';
import React, {useCallback} from 'react';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {CommentUtils} from '../../../../shared/utils/CommentUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {Text, useColorModeValue} from 'native-base';
import UserView from '../../../../components/views/UserView';
import FVStack from '../../../../components/boxes/FVStack';
import CommentListItemReactions from './CommentListItemReactions';
import CommentListItemMenu from './CommentListItemMenu';
import DateView from '../../../../components/views/DateView';
import {UserUtils} from '../../../../shared/utils/UserUtils';

type CommentListItemProps = {
  comment: Comment;
};

const CommentListItem = ({comment}: CommentListItemProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const user = useAppSelector((state) => userSelector(state, comment.userId));

  const date = new Date(comment.createdAt);
  const isOwnComment = CommentUtils.isOwnComment(comment, account);

  const bg = useColorModeValue('gray.50', 'gray.700');

  return (
    <FHStack px="4" py="2" space="2">
      <FVStack mt="1.5" space="2">
        {user && <UserView user={user} picSize="md" />}
      </FVStack>
      <FVStack grow space="1" backgroundColor={bg} px="2" py="1.5" borderRadius="xl">
        <FHStack space="3" alignItems="center">
          <FHStack grow space="3" alignItems="center">
            <Text color="primary.500" fontWeight="bold">
              {UserUtils.getUsername(user, t)}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="xs">
            <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
          </Text>
          <CommentListItemMenu comment={comment} isOwnComment={isOwnComment} />
        </FHStack>
        {!comment.isDeleted && <Text>{comment.text}</Text>}
        {comment.isDeleted && (
          <Text color="gray.400" fontWeight="bold">
            {t('comment:comment.deleted')}
          </Text>
        )}
      </FVStack>
      <CommentListItemReactions comment={comment} isOwnComment={isOwnComment} />
    </FHStack>
  );
};

export default CommentListItem;

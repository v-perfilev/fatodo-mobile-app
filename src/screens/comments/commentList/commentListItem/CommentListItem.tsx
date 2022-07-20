import {Comment} from '../../../../models/Comment';
import React, {Dispatch, SetStateAction} from 'react';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import UsersSelectors from '../../../../store/users/usersSelectors';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import {CommentUtils} from '../../../../shared/utils/CommentUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import UserView from '../../../../components/views/UserView';
import FVStack from '../../../../components/boxes/FVStack';
import CommentListItemReferenceButton from './CommentListItemReferenceButton';
import CommentListItemReactions from './CommentListItemReactions';
import CommentListItemMenu from './CommentListItemMenu';
import CommentListItemReference from './CommentListItemReference';

type CommentListItemProps = {
  comment: Comment;
  setReference: Dispatch<SetStateAction<Comment>>;
};

const CommentListItem = ({comment, setReference}: CommentListItemProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector(UsersSelectors.users);

  const user = CommentUtils.extractUserFromComment(users, comment);
  const date = DateFormatters.formatDependsOnDay(new Date(comment.createdAt));
  const isOwnComment = CommentUtils.isOwnComment(comment, account);

  return (
    <FHStack space="2">
      <FVStack mt="1.5" space="2">
        {user && <UserView user={user} picSize="sm" />}
        <CommentListItemReactions comment={comment} isOwnComment={isOwnComment} />
      </FVStack>
      <FVStack
        grow
        smallSpace
        borderWidth="1"
        borderColor="gray.300"
        borderRadius="5"
        backgroundColor="gray.50"
        px="2"
        py="1.5"
      >
        <FHStack defaultSpace alignItems="center">
          <FHStack grow defaultSpace alignItems="center">
            <Text color="primary.500" fontWeight="bold">
              {user?.username}
            </Text>
            <Text color="gray.400" fontWeight="bold" fontSize="xs">
              {date}
            </Text>
          </FHStack>
          <CommentListItemReferenceButton comment={comment} setReference={setReference} />
          <CommentListItemMenu comment={comment} isOwnComment={isOwnComment} setReference={setReference} />
        </FHStack>
        {comment.reference && <CommentListItemReference reference={comment.reference} />}
        {!comment.isDeleted && <Text color="gray.700">{comment.text}</Text>}
        {comment.isDeleted && (
          <Text color="gray.400" fontWeight="bold">
            {t('comment:comment.deleted')}
          </Text>
        )}
      </FVStack>
    </FHStack>
  );
};

export default CommentListItem;

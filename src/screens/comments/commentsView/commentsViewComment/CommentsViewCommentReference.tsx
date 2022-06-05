import React from 'react';
import {ReferenceComment} from '../../../../models/Comment';
import {useAppSelector} from '../../../../store/store';
import UsersSelectors from '../../../../store/users/usersSelectors';
import {CommentUtils} from '../../../../shared/utils/CommentUtils';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type CommentViewCommentReferenceProps = {
  reference: ReferenceComment;
};

const CommentsViewCommentReference = ({reference}: CommentViewCommentReferenceProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(UsersSelectors.users);

  const user = CommentUtils.extractUserFromComment(users, reference);
  const date = DateFormatters.formatDependsOnDay(new Date(reference.createdAt));

  return (
    <FHStack smallSpace>
      <Text color="gray.400" fontWeight="bold">
        {t('comment:view.reference')}:
      </Text>
      <Text fontWeight="bold">
        {user.username}, {date}
      </Text>
    </FHStack>
  );
};

export default CommentsViewCommentReference;

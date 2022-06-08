import React from 'react';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {ReferenceComment} from '../../../models/Comment';
import {useAppSelector} from '../../../store/store';
import UsersSelectors from '../../../store/users/usersSelectors';
import {CommentUtils} from '../../../shared/utils/CommentUtils';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import FHStack from '../../../components/boxes/FHStack';
import CloseIcon from '../../../components/icons/CloseIcon';
import PressableButton from '../../../components/controls/PressableButton';

type CommentViewCommentReferenceProps = {
  reference: ReferenceComment;
  clearReference: () => void;
};

const CommentsViewCommentReference = ({reference, clearReference}: CommentViewCommentReferenceProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(UsersSelectors.users);

  const user = CommentUtils.extractUserFromComment(users, reference);
  const date = DateFormatters.formatDependsOnDay(new Date(reference.createdAt));

  return (
    <FHStack smallSpace alignItems="center">
      <Text color="gray.400" fontWeight="bold" fontSize="2xs">
        {t('comment:view.reference')}:
      </Text>
      <Text fontWeight="bold" fontSize="2xs">
        {user.username}, {date}
      </Text>
      <PressableButton onPress={clearReference}>
        <CloseIcon size="xs" />
      </PressableButton>
    </FHStack>
  );
};

export default CommentsViewCommentReference;

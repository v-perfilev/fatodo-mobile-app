import React from 'react';
import {ReferenceComment} from '../../../../models/Comment';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {CommentUtils} from '../../../../shared/utils/CommentUtils';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type CommentListItemReferenceProps = {
  reference: ReferenceComment;
};

const CommentListItemReference = ({reference}: CommentListItemReferenceProps) => {
  const {t} = useTranslation();
  const users = useAppSelector(InfoSelectors.users);

  const user = CommentUtils.extractUserFromComment(users, reference);
  const date = DateFormatters.formatDependsOnDay(new Date(reference.createdAt));

  return (
    <FHStack smallSpace>
      <Text color="gray.400" fontWeight="bold" fontSize="2xs">
        {t('comment:view.reference')}:
      </Text>
      <Text fontWeight="bold" fontSize="2xs">
        {user?.username}, {date}
      </Text>
    </FHStack>
  );
};

export default CommentListItemReference;

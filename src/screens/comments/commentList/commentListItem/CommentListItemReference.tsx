import React, {useCallback} from 'react';
import {ReferenceComment} from '../../../../models/Comment';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import DateView from '../../../../components/views/DateView';

type CommentListItemReferenceProps = {
  reference: ReferenceComment;
};

const CommentListItemReference = ({reference}: CommentListItemReferenceProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const user = useAppSelector((state) => userSelector(state, reference.userId));

  const date = new Date(reference.createdAt);

  return (
    <FHStack smallSpace>
      <Text color="gray.400" fontWeight="bold" fontSize="2xs">
        {t('comment:view.reference')}:
      </Text>
      <Text fontWeight="bold" fontSize="2xs">
        {user?.username}, <DateView date={date} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
      </Text>
    </FHStack>
  );
};

export default CommentListItemReference;

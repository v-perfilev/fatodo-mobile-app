import React, {useCallback} from 'react';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {ReferenceComment} from '../../../models/Comment';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import FHStack from '../../../components/boxes/FHStack';
import CloseIcon from '../../../components/icons/CloseIcon';
import PressableButton from '../../../components/controls/PressableButton';

type CommentListControlReferenceProps = {
  reference: ReferenceComment;
  clearReference: () => void;
};

const CommentListControlReference = ({reference, clearReference}: CommentListControlReferenceProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const user = useAppSelector((state) => userSelector(state, reference.userId));

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

export default CommentListControlReference;

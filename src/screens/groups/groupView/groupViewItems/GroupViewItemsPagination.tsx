import React from 'react';
import ArrowDownIcon from '../../../../components/icons/ArrowDownIcon';
import RoundButton from '../../../../components/controls/RoundButton';
import ArrowUpIcon from '../../../../components/icons/ArrowUpIcon';
import FHStack from '../../../../components/surfaces/FHStack';
import {Text} from 'native-base';

type GroupViewItemsPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const GroupViewItemsPagination = ({page, setPage, totalPages}: GroupViewItemsPaginationProps) => {
  const totalPageToShow = totalPages > 0 ? totalPages : 1;

  const upDisabled = page === 0;
  const downDisabled = page === totalPageToShow - 1;

  const onUpClick = (): void => {
    if (!upDisabled) {
      setPage(page - 1);
    }
  };

  const onDownClick = (): void => {
    if (!downDisabled) {
      setPage(page + 1);
    }
  };

  return (
    <FHStack space="1" alignItems="center">
      <RoundButton leftIcon={<ArrowUpIcon size="md" />} isDisabled={upDisabled} onPress={onUpClick} />
      <Text fontSize="14" fontWeight="bold">
        {page + 1} / {totalPageToShow}
      </Text>
      <RoundButton leftIcon={<ArrowDownIcon size="md" />} isDisabled={downDisabled} onPress={onDownClick} />
    </FHStack>
  );
};

export default GroupViewItemsPagination;

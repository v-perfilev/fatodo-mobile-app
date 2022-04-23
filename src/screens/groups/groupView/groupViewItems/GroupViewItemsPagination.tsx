import React, {FC} from 'react';
import {HStack, Text} from 'native-base';
import ArrowDownIcon from '../../../../components/icons/ArrowDownIcon';
import RoundButton from '../../../../components/controls/RoundButton';
import ArrowUpIcon from '../../../../components/icons/ArrowUpIcon';

type GroupViewItemsPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const GroupViewItemsPagination: FC<GroupViewItemsPaginationProps> = ({page, setPage, totalPages}) => {
  const onUpClick = (): void => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const onDownClick = (): void => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <HStack alignItems="center">
      <RoundButton leftIcon={<ArrowUpIcon size="md" />} isDisabled={page === 0} onPress={onUpClick} />
      <Text mx="1" fontSize="14" fontWeight="bold">
        {page + 1} / {totalPages}
      </Text>
      <RoundButton leftIcon={<ArrowDownIcon size="md" />} isDisabled={page === totalPages - 1} onPress={onDownClick} />
    </HStack>
  );
};

export default GroupViewItemsPagination;

import React, {FC, useMemo} from 'react';
import {Center, HStack, Text} from 'native-base';
import ArrowDownIcon from '../../../../components/icons/ArrowDownIcon';
import RoundButton from '../../../../components/controls/RoundButton';
import ArrowUpIcon from '../../../../components/icons/ArrowUpIcon';

type GroupViewItemsPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const GroupViewItemsPagination: FC<GroupViewItemsPaginationProps> = ({page, setPage, totalPages}) => {
  const isMultiPage = useMemo<boolean>(() => totalPages > 1, [totalPages]);

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
  const paginationElement = (
    <HStack alignItems="center">
      <RoundButton leftIcon={<ArrowUpIcon size="sm" />} isDisabled={page === 0} onPress={onUpClick} />
      <Text mx="1" fontSize="14" fontWeight="bold">
        {page + 1} / {totalPages}
      </Text>
      <RoundButton leftIcon={<ArrowDownIcon size="sm" />} isDisabled={page === totalPages - 1} onPress={onDownClick} />
    </HStack>
  );

  return isMultiPage ? paginationElement : null;
};

export default GroupViewItemsPagination;

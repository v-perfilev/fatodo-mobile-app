import FBox from '../boxes/FBox';
import * as React from 'react';
import {memo, ReactElement} from 'react';
import {Text, useColorModeValue} from 'native-base';
import IconButton from '../controls/IconButton';
import CloseIcon from '../icons/CloseIcon';
import FHStack from '../boxes/FHStack';
import FVStack from '../boxes/FVStack';

type NotificationTemplateProps = {
  image?: ReactElement;
  title: string;
  content: ReactElement;
  close: () => void;
};

const NotificationTemplate = ({image, title, content, close}: NotificationTemplateProps) => {
  const titleColor = useColorModeValue('gray.600', 'gray.50');
  const borderColor = useColorModeValue('primary.300', 'gray.600');
  const bg = useColorModeValue('gray.50', 'gray.600');

  return (
    <FVStack space="1" px="3" py="2" borderWidth="1" borderRadius="xl" borderColor={borderColor} bg={bg}>
      <FHStack justifyContent="space-between">
        <FHStack space="2" alignItems="center">
          {image}
          <Text color={titleColor} fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </FHStack>
        <IconButton colorScheme="primary" icon={<CloseIcon />} onPress={close} />
      </FHStack>
      <FHStack space="3">
        <FBox>
          <Text fontSize="md" numberOfLines={4}>
            {content}
          </Text>
        </FBox>
      </FHStack>
    </FVStack>
  );
};

export default memo(NotificationTemplate);

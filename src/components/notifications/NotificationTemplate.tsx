import FBox from '../boxes/FBox';
import * as React from 'react';
import {memo, ReactElement} from 'react';
import {Text, useColorModeValue} from 'native-base';
import IconButton from '../controls/IconButton';
import CloseIcon from '../icons/CloseIcon';
import FHStack from '../boxes/FHStack';
import FVStack from '../boxes/FVStack';
import PressableButton from '../controls/PressableButton';
import {GestureResponderEvent} from 'react-native';
import {useNotificationContext} from '../../shared/contexts/NotificationContext';

type NotificationTemplateProps = {
  image?: ReactElement;
  title: string;
  author?: string;
  content: ReactElement;
  onClick: () => void;
};

const NotificationTemplate = ({image, title, author, content, onClick}: NotificationTemplateProps) => {
  const {close} = useNotificationContext();
  const titleColor = useColorModeValue('gray.600', 'gray.50');
  const authorColor = useColorModeValue('primary.500', 'primary.600');
  const borderColor = useColorModeValue('primary.300', 'gray.600');
  const bg = useColorModeValue('gray.50', 'gray.600');

  const handlePress = (): void => {
    onClick();
    close();
  };

  const handleClose = (e: GestureResponderEvent): void => {
    e.stopPropagation();
    close();
  };

  return (
    <PressableButton onPress={handlePress}>
      <FVStack space="1" px="3" py="2" borderWidth="1" borderRadius="xl" borderColor={borderColor} bg={bg}>
        <FHStack justifyContent="space-between">
          <FHStack space="2" alignItems="center">
            {image}
            <Text color={titleColor} fontSize="md" fontWeight="bold">
              {title}
            </Text>
          </FHStack>
          <IconButton colorScheme="primary" icon={<CloseIcon />} onPress={handleClose} />
        </FHStack>
        <FHStack space="3">
          <FBox>
            <Text fontSize="md" numberOfLines={4}>
              {author && (
                <Text color={authorColor} fontWeight="bold">
                  {author}: &nbsp;
                </Text>
              )}
              {content}
            </Text>
          </FBox>
        </FHStack>
      </FVStack>
    </PressableButton>
  );
};

export default memo(NotificationTemplate);

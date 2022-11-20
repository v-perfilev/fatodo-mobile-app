import React, {Dispatch, memo, SetStateAction, useEffect, useRef, useState} from 'react';
import {Switch, Text} from 'native-base';
import FVStack from '../../../components/boxes/FVStack';
import {Animated, Platform, StyleProp, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';

type GroupViewHeaderArchivedTogglerProps = {
  setShowArchived: Dispatch<SetStateAction<boolean>>;
};

const GroupViewHeaderArchivedToggler = ({setShowArchived}: GroupViewHeaderArchivedTogglerProps) => {
  const {t} = useTranslation();
  const [localShowArchived, setLocalShowArchived] = useState<boolean>(false);
  const fadeActive = useRef(new Animated.Value(1)).current;
  const fadeArchived = fadeActive.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const fadeInActive = () => {
    Animated.timing(fadeActive, {toValue: 1, duration: 0, useNativeDriver: true}).start();
  };

  const fadeInArchived = () => {
    Animated.timing(fadeActive, {toValue: 0, duration: 0, useNativeDriver: true}).start();
  };

  const toggleShowArchived = (): void => {
    !localShowArchived ? fadeInArchived() : fadeInActive();
    setLocalShowArchived((prevState) => !prevState);
  };

  const textStyle: StyleProp<ViewStyle> = {position: 'absolute'};
  const archivedTextAnimatedStyle = {opacity: fadeArchived};
  const activeTextAnimatedStyle = {opacity: fadeActive};

  useEffect(() => {
    setShowArchived(localShowArchived);
  }, [localShowArchived]);

  return (
    <FVStack w="60px" alignItems="center">
      <Animated.View style={[textStyle, archivedTextAnimatedStyle]}>
        <Text fontWeight="bold" color="gray.400" fontSize="xs">
          {t('group:actions.archived')}
        </Text>
      </Animated.View>
      <Animated.View style={[textStyle, activeTextAnimatedStyle]}>
        <Text fontWeight="bold" color="gray.400" fontSize="xs">
          {t('group:actions.active')}
        </Text>
      </Animated.View>
      <Switch
        mt="4"
        size={Platform.OS === 'android' ? 'md' : 'sm'}
        isChecked={!localShowArchived}
        onToggle={toggleShowArchived}
      />
    </FVStack>
  );
};

export default memo(GroupViewHeaderArchivedToggler);

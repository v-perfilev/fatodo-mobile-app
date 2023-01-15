import React from 'react';
import {useTranslation} from 'react-i18next';
import StartupModalTemplate from './StartupModalTemplate';
import FVStack from '../boxes/FVStack';
import {Text} from 'native-base';
import FHStack from '../boxes/FHStack';
import OutlinedButton from '../controls/OutlinedButton';
import SolidButton from '../controls/SolidButton';
import Logo from '../layouts/Logo';
import {Linking, Platform} from 'react-native';

type StartupModalVersionProps = {
  storeUrl: string;
  close: () => void;
};

const StartupModalVersion = ({storeUrl, close}: StartupModalVersionProps) => {
  const {t} = useTranslation();

  const handlePress = (): void => {
    Linking.openURL(storeUrl).finally();
  };

  return (
    <StartupModalTemplate>
      <FVStack space="5">
        <FHStack space="5" alignItems="center">
          <Logo size={12} />
          <Text flex="1" flexWrap="wrap">
            {Platform.OS === 'ios' ? t('common:versionCheck.iosMessage') : t('common:versionCheck.androidMessage')}
          </Text>
        </FHStack>
        <FHStack space="5" justifyContent="flex-end">
          <OutlinedButton size="lg" onPress={close}>
            {t('common:versionCheck.cancel')}
          </OutlinedButton>
          <SolidButton size="lg" onPress={handlePress}>
            {t('common:versionCheck.update')}
          </SolidButton>
        </FHStack>
      </FVStack>
    </StartupModalTemplate>
  );
};

export default StartupModalVersion;

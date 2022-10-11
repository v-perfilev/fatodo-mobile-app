import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {Text, useColorModeValue} from 'native-base';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import UrlPic from '../surfaces/UrlPic';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import FHStack from '../boxes/FHStack';
import Logo from './Logo';
import {HEADER_HEIGHT} from '../../constants';
import PressableButton from '../controls/PressableButton';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import UserView from '../views/UserView';
import {DARK_BG, LIGHT_BG} from '../../shared/themes/colors';
import {accountToUser} from '../../models/User';
import IconButton from '../controls/IconButton';

type HeaderProps = PropsWithChildren<{
  title?: string;
  imageFilename?: string;
  showAvatar?: boolean;
  showLogo?: boolean;
  hideGoBack?: boolean;
  hideTitle?: boolean;
}>;

const Header = ({children, title, imageFilename, showAvatar, showLogo, hideGoBack, hideTitle}: HeaderProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {toggleDrawer} = useDrawerContext();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const label = title || t('routes.' + route.name);

  const goBack = useCallback(() => navigation.goBack(), [isFocused]);
  const canGoBack = useMemo(() => navigation.canGoBack(), [isFocused]);

  const background = useColorModeValue(LIGHT_BG, DARK_BG);

  return (
    <FHStack h={HEADER_HEIGHT} smallSpace bg={background} px="2" alignItems="center">
      {!hideGoBack && canGoBack && <IconButton size="2xl" icon={<ArrowBackIcon />} onPress={goBack} />}
      <FHStack defaultSpace alignItems="center">
        {showAvatar && (
          <PressableButton onPress={toggleDrawer}>
            <UserView user={accountToUser(account)} withUserPic picSize="43px" />
          </PressableButton>
        )}
        {showLogo && <Logo size={10} />}
        {!hideTitle && imageFilename && <UrlPic file={imageFilename} size="43px" border="1" />}
        {!hideTitle && (
          <Text fontWeight="400" fontSize="xl" lineHeight="xl" color="primary.500" isTruncated>
            {label}
          </Text>
        )}
      </FHStack>
      <FHStack grow h="100%" smallSpace alignItems="center" justifyContent="flex-end">
        {children}
      </FHStack>
    </FHStack>
  );
};

export default Header;

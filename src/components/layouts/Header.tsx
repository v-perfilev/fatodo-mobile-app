import React, {PropsWithChildren, ReactElement, useCallback, useMemo} from 'react';
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
  afterTitle?: ReactElement;
  onTitleClick?: () => void;
}>;

const Header = ({
  children,
  title,
  imageFilename,
  showAvatar,
  showLogo,
  hideGoBack,
  hideTitle,
  afterTitle,
  onTitleClick,
}: HeaderProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {toggleDrawer} = useDrawerContext();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();

  const showStandardItems = showAvatar || showLogo || !hideTitle;
  const label = title || t('routes.' + route.name);

  const goBack = useCallback(() => navigation.goBack(), [isFocused]);
  const canGoBack = useMemo(() => navigation.canGoBack(), [isFocused]);

  const background = useColorModeValue(LIGHT_BG, DARK_BG);

  return (
    <FHStack height={HEADER_HEIGHT} space="1" bg={background} px="2" alignItems="center">
      {!hideGoBack && canGoBack && <IconButton size="2xl" icon={<ArrowBackIcon />} onPress={goBack} />}
      {showStandardItems && (
        <FHStack grow space="3" alignItems="center" overflow="hidden">
          {showAvatar && (
            <PressableButton onPress={toggleDrawer}>
              <UserView user={accountToUser(account)} withUserPic picSize="43px" />
            </PressableButton>
          )}
          {showLogo && <Logo size={10} />}
          {!hideTitle && imageFilename && <UrlPic file={imageFilename} size="43px" border="1" />}
          {!hideTitle && (
            <PressableButton onPress={onTitleClick}>
              <FHStack space="1" alignItems="center">
                <Text fontWeight="400" fontSize="xl" lineHeight="xl" color="primary.500" isTruncated>
                  {label}
                </Text>
                {afterTitle}
              </FHStack>
            </PressableButton>
          )}
        </FHStack>
      )}
      <FHStack grow={!showStandardItems} h="100%" space="1" alignItems="center" justifyContent="flex-end">
        {children}
      </FHStack>
    </FHStack>
  );
};

export default Header;

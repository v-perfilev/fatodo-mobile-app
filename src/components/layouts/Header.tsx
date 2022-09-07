import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {Text} from 'native-base';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import ColoredStatusBar from './ColoredStatusBar';
import UrlPic from '../surfaces/UrlPic';
import ArrowBackIcon from '../icons/ArrowBackIcon';
import FHStack from '../boxes/FHStack';
import Logo from './Logo';
import IconButton from '../controls/IconButton';
import {HEADER_HEIGHT} from '../../constants';
import PressableButton from '../controls/PressableButton';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import UserView from '../views/UserView';

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
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {toggleDrawer} = useDrawerContext();
  const route = useRoute();
  const {t} = useTranslation();

  const label = title || t('routes.' + route.name);

  const goBack = useCallback(() => navigation.goBack(), [isFocused]);
  const canGoBack = useMemo(() => navigation.canGoBack(), [isFocused]);

  return (
    <>
      <ColoredStatusBar />
      <FHStack h={HEADER_HEIGHT} defaultSpace bg="white" px="2" alignItems="center">
        {!hideGoBack && canGoBack && <IconButton size="2xl" p="1" icon={<ArrowBackIcon />} onPress={goBack} />}
        {showAvatar && (
          <PressableButton onPress={toggleDrawer}>
            <UserView user={account} withUserPic picSize="43px" />
          </PressableButton>
        )}
        {showLogo && <Logo size={10} />}
        {!hideTitle && imageFilename && <UrlPic file={imageFilename} size="43px" border="1" />}
        {!hideTitle && (
          <Text fontWeight="400" fontSize="xl" lineHeight="xl" color="primary.500" isTruncated>
            {label}
          </Text>
        )}
        <FHStack grow h="100%" space="2" alignItems="center" justifyContent="flex-end">
          {children}
        </FHStack>
      </FHStack>
    </>
  );
};

export default Header;

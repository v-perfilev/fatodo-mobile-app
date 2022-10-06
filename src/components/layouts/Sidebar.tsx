import React, {useEffect} from 'react';
import {DrawerContentComponentProps, DrawerContentScrollView} from '@react-navigation/drawer';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {useTranslation} from 'react-i18next';
import {useDrawerContext} from '../../shared/contexts/DrawerContext';
import AuthSelectors from '../../store/auth/authSelectors';
import {AuthActions} from '../../store/auth/authActions';
import {RootActions} from '../../store/rootActions';
import {ChangeLanguageDTO} from '../../models/dto/ChangeLanguageDTO';
import FVStack from '../boxes/FVStack';
import UserFullView from '../views/UserFullView';
import GhostButton from '../controls/GhostButton';
import LanguageMenu from '../controls/LanguageMenu';
import OutlinedButton from '../controls/OutlinedButton';
import Separator from './Separator';
import {StyleProp, ViewStyle} from 'react-native';
import ColorModeSwitch from '../controls/ColorModeSwitch';
import {useColorModeValue} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../../shared/themes/colors';
import {accountToUser} from '../../models/User';

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1};

const Sidebar = ({navigation}: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {toggleDrawer, setToggleDrawer} = useDrawerContext();
  const account = useAppSelector(AuthSelectors.account);

  const goToAccountForm = (): void => {
    navigation.navigate('AccountForm');
  };

  const goToAccountChangePasswordForm = (): void => {
    navigation.navigate('AccountChangePasswordForm');
  };

  const logout = (): void => {
    toggleDrawer();
    dispatch(AuthActions.logout());
    requestAnimationFrame(() => {
      dispatch(RootActions.resetState());
    });
  };

  const changeLanguage = (code: string): void => {
    requestAnimationFrame(() => {
      const dto: ChangeLanguageDTO = {language: code};
      dispatch(AuthActions.changeLanguageThunk(dto));
    });
  };

  useEffect(() => {
    setToggleDrawer(() => navigation.toggleDrawer);
  }, []);

  const backgroundColor = useColorModeValue(LIGHT_BG, DARK_BG);

  return (
    <DrawerContentScrollView contentContainerStyle={[flexStyle, {backgroundColor}]}>
      <FVStack grow mx="3" my="4" space="6" defaultSpace>
        <UserFullView user={accountToUser(account)} account={account} />

        <Separator bg="secondary.500" />

        <FVStack flex="1" flexGrow="1" defaultSpace flexShrink="1">
          <GhostButton justifyContent="flex-start" onPress={goToAccountForm}>
            {t('routes.AccountForm')}
          </GhostButton>
          {account.provider === 'LOCAL' && (
            <GhostButton justifyContent="flex-start" onPress={goToAccountChangePasswordForm}>
              {t('routes.AccountChangePasswordForm')}
            </GhostButton>
          )}
        </FVStack>

        <LanguageMenu onChange={changeLanguage} />
        <ColorModeSwitch />
        <OutlinedButton onPress={logout}>{t('account:actions.logout')}</OutlinedButton>
      </FVStack>
    </DrawerContentScrollView>
  );
};

export default Sidebar;

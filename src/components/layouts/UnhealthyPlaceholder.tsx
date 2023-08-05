import React from 'react';
import SimpleScrollView from '../scrollable/SimpleScrollView';
import FCenter from '../boxes/FCenter';
import FVStack from '../boxes/FVStack';
import {Image, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import OutlinedButton from '../controls/OutlinedButton';
import FHStack from '../boxes/FHStack';
import {AuthActions} from '../../store/auth/authActions';

const img = require('../../../assets/images/content-2.png');
const size = 200;

const UnhealthyPlaceholder = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();

  const tryAgain = (): void => {
    dispatch(AuthActions.checkHealthThunk());
  };

  return (
    <SimpleScrollView position="relative">
      <FCenter grow pt="10" pb="5">
        <FVStack space="10" w="90%" maxW="300px">
          <FCenter grow>
            <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
          </FCenter>
          <Text fontSize="lg" fontWeight="bold" color="gray.400" textAlign="center">
            {t('account:unhealthy.message')}
          </Text>
          <FHStack space="3" justifyContent="center">
            <OutlinedButton colorScheme="primary" size="md" isLoading={loading} isDisabled={loading} onPress={tryAgain}>
              {t('account:unhealthy.tryAgain')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      </FCenter>
    </SimpleScrollView>
  );
};

export default UnhealthyPlaceholder;

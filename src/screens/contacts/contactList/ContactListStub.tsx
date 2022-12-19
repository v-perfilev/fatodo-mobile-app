import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import FVStack from '../../../components/boxes/FVStack';
import {Image, Text} from 'native-base';
import {CONTACTS_FILTER_HEIGHT} from '../../../constants';

const img = require('../../../../assets/images/content-2.png');
const size = 150;

const ContactListStub = () => {
  const {t} = useTranslation();

  return (
    <StubBox paddingBottom={CONTACTS_FILTER_HEIGHT}>
      <FVStack space="5" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <Text fontSize="lg" fontWeight="bold" color="gray.400" textAlign="center">
          {t('contact:relations.relationsNotFound')}
        </Text>
      </FVStack>
    </StubBox>
  );
};

export default ContactListStub;

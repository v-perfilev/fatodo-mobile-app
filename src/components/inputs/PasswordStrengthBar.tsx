import * as React from 'react';
import {Box} from 'native-base';
import FHStack from '../surfaces/FHStack';
import {passwordStrengthMap, passwordStrengthPostfix, passwordStrengthPrefix} from '../../shared/validators';

type PasswordStrengthBardProps = {
  password: string;
};

export const PasswordStrengthBar = ({password}: PasswordStrengthBardProps) => {
  const rulesCount = 4;
  let counter = 0;
  if (password.length >= 8) {
    counter++;
  }

  passwordStrengthMap.forEach((regexString: string) => {
    const regex = new RegExp(passwordStrengthPrefix + regexString + passwordStrengthPostfix);
    if (regex.exec(password)) {
      counter++;
    }
  });

  const subItems = [];
  for (let i = 0; i < counter; i++) {
    subItems.push(<Box flexGrow="1" bgColor="primary.500" key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<Box flexGrow="1" bgColor="warning.500" key={i} />);
  }

  return (
    <FHStack w="100%" h="6px" space="1" justifyContent="space-between">
      {subItems}
    </FHStack>
  );
};

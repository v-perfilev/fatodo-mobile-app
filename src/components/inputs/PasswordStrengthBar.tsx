import * as React from 'react';
import FHStack from '../boxes/FHStack';
import {passwordStrengthMap, passwordStrengthPostfix, passwordStrengthPrefix} from '../../shared/validators';
import FBox from '../boxes/FBox';

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
    subItems.push(<FBox bgColor="primary.500" key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<FBox bgColor="warning.500" key={i} />);
  }

  return (
    <FHStack w="100%" h="6px" smallSpace justifyContent="space-between">
      {subItems}
    </FHStack>
  );
};

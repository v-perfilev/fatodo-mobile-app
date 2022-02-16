import * as React from 'react';
import {FC} from 'react';
import {
  passwordStrengthMap,
  passwordStrengthPostfix,
  passwordStrengthPrefix,
} from '../../screens/auth/forgotPassword/ForgotPasswordValidators';
import {Box} from 'native-base';

type Props = {
  password: string;
};

export const PasswordStrengthBar: FC<Props> = ({password}: Props) => {
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
    subItems.push(<Box flexGrow={1} mx={1} bgColor="primary.500" key={i} />);
  }
  for (let i = counter; i < rulesCount; i++) {
    subItems.push(<Box flexGrow={1} mx={1} bgColor="warning.500" key={i} />);
  }

  return (
    <Box w="100%" h="1.5" mt="1" flexDir="row" justifyContent="space-between">
      {subItems}
    </Box>
  );
};

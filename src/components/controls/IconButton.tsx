import React, {MutableRefObject, ReactElement} from 'react';
import {Box, IButtonProps} from 'native-base';
import {ColorSchemeType, SizeType} from 'native-base/lib/typescript/components/types';
import PressableButton from './PressableButton';

type IconButtonProps = IButtonProps & {
  icon: ReactElement;
  size?: SizeType;
  colorScheme?: ColorSchemeType;
  bgColorScheme?: ColorSchemeType;
  bgTransparency?: string;
};

const IconButton = React.forwardRef((props: IconButtonProps, ref: HTMLElement) => {
  const {icon, colorScheme = 'primary', bgColorScheme, bgTransparency = '10', size = 'md', p = '2', ...other} = props;

  const prepareColor = (scheme: ColorSchemeType): string => (scheme !== 'white' ? `${scheme}.500` : 'white');
  const prepareBgColor = (scheme: ColorSchemeType): string => prepareColor(scheme) + ':alpha.' + bgTransparency;
  const color = prepareColor(colorScheme);
  const bgColor = bgColorScheme !== null ? prepareBgColor(bgColorScheme || colorScheme) : undefined;

  const iconElement = React.cloneElement(icon, {color, size});

  return (
    <PressableButton {...other} ref={ref as MutableRefObject<any>} rounded="full" overflow="hidden">
      <Box bgColor={bgColor} p={p}>
        {iconElement}
      </Box>
    </PressableButton>
  );
});

export default IconButton;

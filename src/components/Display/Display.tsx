import { Box } from '@chakra-ui/react';

import { defaultTheme, theme } from '../../assets/theme';

interface DisplayProps {
  displayValue: Display;
}

export const Display = ({ displayValue }: DisplayProps) => {
  const savedTheme = (localStorage.getItem('theme') ?? defaultTheme) as Theme;
  const { color, background } = theme[savedTheme].main.display;

  const getDisplayValue = () => {
    if (displayValue.firstNumber) {
      if (displayValue.operator) return displayValue.firstNumber + displayValue.operator + displayValue.secondNumber;

      return displayValue.firstNumber;
    }

    if (displayValue.operator && !displayValue.secondNumber)
      return displayValue.firstNumber + displayValue.operator + '0';

    return '0';
  };

  return (
    <Box
      overflowY="hidden"
      overflowX="auto"
      whiteSpace="nowrap"
      w="100%"
      maxH="138px"
      p={['clamp(25px, 3.5vw, 50px)', null, '35px 30px 30px 25px']}
      textAlign="end"
      rounded="0.625rem"
      color={color}
      bg={background}
      fontSize={['3xl', null, '5xl']}
      transition="background 0.5s, color 0.5s"
    >
      {getDisplayValue()}
    </Box>
  );
};

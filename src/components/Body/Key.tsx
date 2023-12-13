import { Button, ButtonProps } from '@chakra-ui/react';

import { defaultTheme, theme } from '../../assets/theme';
import { calculatorKeys } from '../../constants';

type CalculatorKeys = typeof calculatorKeys;

type KeyProps = {
  [K in keyof CalculatorKeys]: {
    'data-key-value': K;
    'data-key-content': CalculatorKeys[K] extends readonly unknown[] ? CalculatorKeys[K][number] : CalculatorKeys[K];
  };
}[keyof CalculatorKeys];

export const Key = (props: KeyProps & ButtonProps) => {
  const savedTheme = (localStorage.getItem('theme') ?? defaultTheme) as Theme;
  const { color, background, borderColor } = theme[savedTheme].main.body.key;

  return (
    <Button
      w="full"
      h="full"
      p={['15px 0 5px', null, '10px 0']}
      borderBottom="5px solid"
      borderColor={borderColor}
      bg={background}
      color={color}
      fontFamily="inherit"
      fontSize={['3xl', null, '2rem']}
      textTransform="uppercase"
      rounded="10px"
      transform="auto"
      transition="background 0.5s, color 0.5s, border-bottom 0.2s, transform 0.2s"
      _active={{
        translateY: '1px',
        borderBottomWidth: '4px'
      }}
      _hover={{}}
      {...props}
    />
  );
};

import { Box } from '@chakra-ui/react';

import { defaultTheme, theme } from '../../assets/theme';

interface DisplayProps {
  displayValue: string;
}

export const Display = ({ displayValue }: DisplayProps) => {
  const savedTheme = (localStorage.getItem('theme') ?? defaultTheme) as Theme;
  const { color, background } = theme[savedTheme].main.display;

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
      {displayValue}
    </Box>
  );
};

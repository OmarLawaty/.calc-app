import { Box, Heading } from '@chakra-ui/react';

import { ThemeController } from './';
import theme from '../../assets/theme.json';

export const Header = ({ activeTheme, setActiveTheme }) => (
  <Box
    as="header"
    display="flex"
    justifyContent="space-between"
    color={theme[activeTheme].header.color}
    transition="color 0.5s"
    fontFamily="inherit"
  >
    <Heading as="h1" userSelect="none" fontFamily="inherit">
      calc
    </Heading>

    <ThemeController activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
  </Box>
);

import { Box, Heading } from '@chakra-ui/react';

import { ThemeController } from './';

export const Header = ({ activeTheme, setActiveTheme }) => {
  return (
    <Box
      as="header"
      display="flex"
      justifyContent="space-between"
      color="hsl(0, 0%, 100%)"
      transition="color 0.5s"
      fontFamily="inherit"
    >
      <Heading as="h1" userSelect="none" fontFamily="inherit">
        calc
      </Heading>

      <ThemeController activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
    </Box>
  );
};

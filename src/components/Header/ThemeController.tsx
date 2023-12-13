import { Flex, Box, Text } from '@chakra-ui/react';

import { Range } from './Range';

interface ThemeControllerProps {
  activeTheme: Theme;
  setActiveTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeController = ({ activeTheme, setActiveTheme }: ThemeControllerProps) => {
  const onThemeChange = (theme: Theme) => {
    setActiveTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <Flex flexDir="column" gap="5px">
      <Box fontSize="13px" textAlign="end">
        {[1, 2, 3].map(item => (
          <Text letterSpacing="12px" display="inline" key={item}>
            {item}
          </Text>
        ))}
      </Box>

      <Flex align="center" gap="20px">
        <Box fontSize="12px" letterSpacing="1px" as="label" htmlFor="theme" textTransform="uppercase">
          theme
        </Box>

        <Range activeTheme={activeTheme} onThemeChange={onThemeChange} />
      </Flex>
    </Flex>
  );
};

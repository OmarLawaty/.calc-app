import { Flex, Box, Text } from '@chakra-ui/react';

import { Range } from './Range';

export const ThemeController = ({ activeTheme, setActiveTheme }) => {
  const handleChange = value => {
    setActiveTheme(value);
    localStorage.setItem('theme', value);
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

        <Range activeTheme={activeTheme} handleChange={handleChange} />
      </Flex>
    </Flex>
  );
};

import { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Header, Display, Body } from './components';

const App = () => {
  const [activeTheme, setActiveTheme] = useState(1);
  const [currentDisplayValue, setCurrentDisplayValue] = useState('0');

  useEffect(() => {
    const saved_theme = localStorage.getItem('theme');

    if (saved_theme) setActiveTheme(saved_theme);
  }, []);

  return (
    <Flex
      justify="center"
      minW="100vw"
      minH="100vh"
      bg="hsl(222, 26%, 31%)"
      transition="background 0.5s"
      p="min(102px, 9vw) 23px"
    >
      <Flex flexDir="column" gap="30px" w="clamp(440px, 43.8%, 850px)">
        <Header setActiveTheme={setActiveTheme} activeTheme={activeTheme} />

        <Box as="main">
          <Display currentDisplayValue={currentDisplayValue} />

          <Body currentDisplayValue={currentDisplayValue} setCurrentDisplayValue={setCurrentDisplayValue} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default App;

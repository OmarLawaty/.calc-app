import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { Header, Display, Body } from './components';
import theme from './assets/theme.json';

const App = () => {
  const [activeTheme, setActiveTheme] = useState(1);
  const [currentDisplayValue, setCurrentDisplayValue] = useState('0');

  const { background } = theme[activeTheme].body;

  useEffect(() => {
    const saved_theme = localStorage.getItem('theme');

    if (saved_theme) setActiveTheme(saved_theme);
  }, []);

  return (
    <Flex
      justify="center"
      minW="100vw"
      minH="100vh"
      bg={background}
      transition="background 0.5s"
      p="min(102px, 9vw) 23px"
    >
      <Flex flexDir="column" gap="30px" w="clamp(440px, 43.8%, 850px)">
        <Header setActiveTheme={setActiveTheme} activeTheme={activeTheme} />

        <Flex as="main" flexDir="column" gap="27px">
          <Display currentDisplayValue={currentDisplayValue} />

          <Body currentDisplayValue={currentDisplayValue} setCurrentDisplayValue={setCurrentDisplayValue} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;

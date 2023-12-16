import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { Header, Display, Body } from './components';
import { theme } from './assets/theme';
import { DEFAULT_DISPLAY_VALUE } from './constants';

const App = () => {
  const [activeTheme, setActiveTheme] = useState<Theme>('1');
  const [displayValue, setDisplayValue] = useState<Display>(DEFAULT_DISPLAY_VALUE);

  const { background } = theme[activeTheme].body;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) return;

    setActiveTheme(savedTheme as Theme);
  }, []);

  return (
    <Flex justify="center" minH="100vh" bg={background} transition="background 0.5s" p="min(102px, 9vw) 23px">
      <Flex flexDir="column" gap="30px" w="clamp(440px, 43.8%, 850px)">
        <Header setActiveTheme={setActiveTheme} activeTheme={activeTheme} />

        <Flex as="main" flexDir="column" gap="27px">
          <Display displayValue={displayValue} />

          <Body displayValue={displayValue} setDisplayValue={setDisplayValue} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;

import { useEffect, useState } from 'react';
import { Header, Display, Body } from './components';

const App = () => {
  const [activeTheme, setActiveTheme] = useState(1);
  const [currentDisplayValue, setCurrentDisplayValue] = useState('0');

  useEffect(() => {
    const saved_theme = localStorage.getItem('theme');

    if (saved_theme) setActiveTheme(saved_theme);
  }, []);

  return (
    <>
      <Header setActiveTheme={setActiveTheme} activeTheme={activeTheme} />

      <main>
        <Display currentDisplayValue={currentDisplayValue} />

        <Body currentDisplayValue={currentDisplayValue} setCurrentDisplayValue={setCurrentDisplayValue} />
      </main>
    </>
  );
};

export default App;

import { ThemeController } from './';

export const Header = ({ activeTheme, setActiveTheme }) => {
  return (
    <header>
      <h1>Calc</h1>

      <ThemeController activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
    </header>
  );
};

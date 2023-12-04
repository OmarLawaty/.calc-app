export const ThemeController = ({ activeTheme, setActiveTheme }) => {
  const handleChange = e => {
    const newValue = e.target.value;

    setActiveTheme(newValue);
    localStorage.setItem('theme', newValue);
  };

  return (
    <div>
      <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>

      <div>
        <label htmlFor="theme">theme</label>

        <input
          type="range"
          name="active-theme"
          id="theme"
          step="1"
          min="1"
          max="3"
          value={activeTheme}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

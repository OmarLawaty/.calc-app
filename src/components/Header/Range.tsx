import { Flex } from '@chakra-ui/react';
import { Slider, SliderTrack, SliderThumb } from '@chakra-ui/slider';

import { defaultTheme, theme } from '../../assets/theme';

interface RangeProps {
  activeTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const Range = ({ activeTheme, onThemeChange }: RangeProps) => {
  const savedTheme = (localStorage.getItem('theme') ?? defaultTheme) as Theme;
  const {
    background,
    rangeThumb: { background: thumbBg }
  } = theme[savedTheme].header.range;

  return (
    <Flex
      align="center"
      justify="center"
      w="68px"
      h="22px"
      transition="background 0.5s"
      bg={background}
      rounded="full"
      p="0 12px"
    >
      <Slider
        value={+activeTheme}
        onChange={theme => onThemeChange(theme.toString() as Theme)}
        min={1}
        max={3}
        step={1}
        cursor="pointer"
        w="55px"
        h="22px"
      >
        <SliderTrack width="60px" borderRadius="full" bg="transparent" />

        <SliderThumb
          w="15px"
          h="15px"
          rounded="full"
          bg={thumbBg}
          transition="background 0.5s"
          _focusVisible={{
            outline: 'none'
          }}
          _active={{
            transform: 'translateY(-50%)'
          }}
        />
      </Slider>
    </Flex>
  );
};

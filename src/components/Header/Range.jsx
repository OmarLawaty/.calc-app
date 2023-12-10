import { Flex } from '@chakra-ui/react';
import { RangeSlider, RangeSliderTrack, RangeSliderThumb } from '@chakra-ui/slider';

import theme from '../../assets/theme.json';

export const Range = ({ activeTheme, handleChange }) => {
  const {
    background,
    rangeThumb: { background: thumbBg }
  } = theme[activeTheme].header.range;

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
      <RangeSlider
        defaultValue={[localStorage.getItem('theme')]}
        onChange={handleChange}
        min={1}
        max={3}
        step={1}
        cursor="pointer"
        w="55px"
        h="22px"
      >
        <RangeSliderTrack width="60px" borderRadius="full" bg="transparent" />

        <RangeSliderThumb
          index={0}
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
      </RangeSlider>
    </Flex>
  );
};

import { Flex } from '@chakra-ui/react';
import { RangeSlider, RangeSliderTrack, RangeSliderThumb } from '@chakra-ui/slider';

export const Range = ({ activeTheme, handleChange }) => {
  return (
    <Flex
      align="center"
      justify="center"
      w="68px"
      h="22px"
      transition="background 0.5s"
      bg="hsl(223, 31%, 20%)"
      rounded="full"
      p="0 10px"
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
          bg="hsl(6, 63%, 50%)"
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

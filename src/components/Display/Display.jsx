import { Box } from '@chakra-ui/react';

export const Display = ({ currentDisplayValue: currentValue }) => (
  <Box
    w="100%"
    p="35px 30px 30px 25px"
    textAlign="end"
    rounded="0.625rem"
    color="white"
    bg="hsl(224, 36%, 15%)"
    fontSize={['3xl', null, '5xl']}
    transition="background 0.5s, color 0.5s"
  >
    {currentValue}
  </Box>
);

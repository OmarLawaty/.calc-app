import { Button } from '@chakra-ui/react';
import React from 'react';

export const Key = ({ children, ...props }) => {
  return (
    <Button
      w="full"
      h="full"
      p="10px 0"
      bg="hsl(30, 25%, 89%)"
      borderBottom="5px solid hsl(28, 16%, 65%)"
      color="hsl(221, 14%, 31%)"
      font="inherit"
      fontSize={['xs', null, '2rem']}
      textTransform="uppercase"
      rounded="10px"
      transform="translateY(0px)"
      transition="background 0.5s, border-bottom 0.5s, color 0.5s, transform 0.1s, border-bottom 0.1s"
      _active={{
        transform: 'translateY(1px);',
        borderBottom: '4px solid hsl(28, 16%, 65%)'
      }}
      _hover={{
        background: 'intial'
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

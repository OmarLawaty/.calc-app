import { Button } from '@chakra-ui/react';

import theme from '../../assets/theme.json';

export const Key = ({ children, ...props }) => {
  const { color, background, borderColor } = theme[localStorage.getItem('theme')].main.body.key;

  return (
    <Button
      w="full"
      h="full"
      p={['15px 0 5px', null, '10px 0']}
      bg={background}
      borderBottom={`5px solid ${borderColor}`}
      color={color}
      font="inherit"
      fontSize={['3xl', null, '2rem']}
      textTransform="uppercase"
      rounded="10px"
      transform="translateY(0px)"
      transition="background 0.5s, color 0.5s, border-bottom 0.2s, transform 0.2s"
      _active={{
        transform: 'translateY(1px);',
        borderBottom: `4px solid ${borderColor}`
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

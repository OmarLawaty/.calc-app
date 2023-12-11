import { extendTheme } from '@chakra-ui/react';

// Global Values
const globalStyles = {
  global: {
    '*': {
      WebkitTapHighlightColor: 'transparent'
    },
    body: {
      scrollbarGutter: 'stable',
      minH: '100vh',
      fontSize: '32px',
      fontWeight: '700'
    }
  }
};

// Base Values
const colors = {
  white: 'hsl(0, 0%, 100%)'
};

export default extendTheme({
  styles: {
    ...globalStyles
  },
  colors,
  fonts: {
    body: '"Spartan", sans-serif'
  }
});

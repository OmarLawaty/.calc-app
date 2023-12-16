export const calculatorKeys = {
  operators: ['+', '-', '*', '/'],
  numbers: Array.from({ length: 10 }, (_, i) => i),
  period: '.',
  equal: '=',
  del: 'del',
  reset: 'reset'
} as const;

export const DEFAULT_DISPLAY_VALUE = { firstNumber: '', operator: null, secondNumber: '' };

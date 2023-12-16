type Theme = '1' | '2' | '3';

type Operator = '+' | '-' | '*' | '/';

type Display = {
  firstNumber: string;
  operator: Operator | null;
  secondNumber: string;
};

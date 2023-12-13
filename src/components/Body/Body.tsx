import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';

import { Key } from './Key';
import { defaultTheme, theme } from '../../assets/theme';
import { DEFAULT_DISPLAY_VALUE, calculatorKeys } from '../../constants';

type CalculatorKey = keyof typeof calculatorKeys;

interface BodyProps {
  displayValue: string;
  setDisplayValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Body = ({ displayValue, setDisplayValue }: BodyProps) => {
  const [operator, setOperator] = useState<Operator | null>(null);

  const savedTheme = (localStorage.getItem('theme') ?? defaultTheme) as Theme;
  const { background, del, reset, equal } = theme[savedTheme].main.body;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') handleDelete();

      if (e.key === '.') handlePeriodInput();

      if (e.key === 'Enter') handleEqualInput();

      if (calculatorKeys.operators.includes(e.key as Operator)) handleOperatorInput(e.key as Operator);

      if (calculatorKeys.numbers.includes(+e.key)) handleNumberInput(e.key);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayValue, operator]);

  const handleReset = () => {
    setDisplayValue(DEFAULT_DISPLAY_VALUE);
    setOperator(null);
  };

  const handleDelete = () =>
    setDisplayValue(prevValue => {
      const valueAfterDeletion = prevValue.slice(0, -1);
      if (!valueAfterDeletion) return DEFAULT_DISPLAY_VALUE;

      const isOperator = calculatorKeys.operators.includes(prevValue.slice(-1) as Operator);
      if (isOperator) setOperator(null);

      return valueAfterDeletion;
    });

  const handleNumberInput = (num: string) =>
    setDisplayValue(displayedValue => (displayedValue === '0' ? num : displayedValue + num));

  const handlePeriodInput = () => {
    const endsInOperator = displayValue.slice(-1) === operator;
    if (endsInOperator) return setDisplayValue(displayValue + '0.');

    const nums = displayValue.split(operator ?? '');
    const lastNum = nums[nums.length - 1];
    if (lastNum.includes('.')) return;

    setDisplayValue(displayValue + '.');
  };

  const handleOperatorInput = (newOperator: Operator) => {
    setOperator(newOperator);

    const hasSecondNum = displayValue.split(operator ?? '').filter(Boolean).length === 2;
    if (operator && hasSecondNum) {
      setDisplayValue(calculate(displayValue, operator) + newOperator);
      return;
    }

    const endsInOperator = calculatorKeys.operators.includes(displayValue.slice(-1) as Operator);
    const endsInPeriod = displayValue.slice(-1) === '.';
    const shouldRemoveLastChar = endsInOperator || endsInPeriod;
    if (shouldRemoveLastChar) {
      setDisplayValue(displayValue.slice(0, -1) + newOperator);
      return;
    }

    setDisplayValue(displayValue + newOperator);
  };

  const handleEqualInput = () => {
    if (!operator || displayValue.split(operator).filter(Boolean).length !== 2) return;

    setOperator(null);

    const newDisplayValue = calculate(displayValue, operator).toString();
    setDisplayValue(newDisplayValue);
  };

  const onKeyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === 'keyboard') return;

    // TODO: Refactor this
    if (['math error', 'invalid operator'].includes(displayValue.toLowerCase())) {
      setDisplayValue('0');
      setOperator(null);
    }

    switch (target.dataset.keyValue as CalculatorKey) {
      case 'reset':
        return handleReset();

      case 'del':
        return handleDelete();

      case 'numbers':
        return handleNumberInput(target.dataset.keyContent!);

      case 'period':
        return handlePeriodInput();

      case 'operators':
        return handleOperatorInput(target.dataset.keyContent as Operator);

      case 'equal':
        return handleEqualInput();
    }
  };

  return (
    <Grid
      id="keyboard"
      p={['20px 25px', null, '30px']}
      gridTemplate={`
        "num-7 num-8 num-9 del" 
        "num-4 num-5 num-6 plus" 
        "num-1 num-2 num-3 minus" 
        "period num-0 divide multiply"
        "reset reset equal equal"
      `}
      gridTemplateColumns="repeat(4, 1fr)"
      gridTemplateRows="repeat(5, 1fr)"
      gap={['10px', null, '25px']}
      rounded="0.625rem"
      bg={background}
      color="white"
      transition="background 0.5s"
      onClick={onKeyClick}
    >
      {calculatorKeys.numbers.map(num => (
        <Key gridArea={`num-${num}`} key={num} data-key-value="numbers" data-key-content={+num}>
          {num}
        </Key>
      ))}

      {calculatorKeys.operators.map(operator => (
        <Key key={operator} gridArea={operatorsMap[operator]} data-key-value="operators" data-key-content={operator}>
          {operator}
        </Key>
      ))}

      <Key gridArea="period" data-key-value="period" data-key-content={calculatorKeys.period}>
        {calculatorKeys.period}
      </Key>

      <Key
        gridArea="del"
        bg={del.background}
        borderColor={del.borderColor}
        fontSize={['lg', null, 'xl']}
        color={del.color}
        data-key-value="del"
        data-key-content={calculatorKeys.del}
        _active={{
          borderColor: del.borderColor
        }}
      >
        {calculatorKeys.del}
      </Key>

      <Key
        gridArea="reset"
        bg={reset.background}
        borderColor={reset.borderColor}
        fontSize={['lg', null, 'xl']}
        color={reset.color}
        data-key-value="reset"
        data-key-content={calculatorKeys.reset}
        _active={{
          borderColor: reset.borderColor
        }}
      >
        {calculatorKeys.reset}
      </Key>

      <Key
        gridArea="equal"
        bg={equal.background}
        borderColor={equal.borderColor}
        fontSize={['lg', null, 'xl']}
        color={equal.color}
        data-key-value="equal"
        data-key-content={calculatorKeys.equal}
        _active={{
          borderColor: equal.borderColor
        }}
      >
        {calculatorKeys.equal}
      </Key>
    </Grid>
  );
};

const operatorsMap: Record<Operator, string> = {
  '+': 'plus',
  '-': 'minus',
  '*': 'multiply',
  '/': 'divide'
};

const calculate = (calculation: string, operator: Operator) => {
  let [firstNumber, secondNumber] = calculation.split(operator).filter(Boolean).map(Number);

  console.log(calculation.split(operator).filter(Boolean).map(Number));

  if (calculation[0] === '-' && operator === '-') {
    firstNumber *= -1;
  }

  switch (operator) {
    case '+':
      return firstNumber + secondNumber;

    case '-':
      return firstNumber - secondNumber;

    case '*':
      return firstNumber * secondNumber;

    case '/':
      if (firstNumber === 0 && secondNumber === 0) return 'Math Error!';

      return firstNumber / secondNumber;

    default:
      return 'Math Error!';
  }
};

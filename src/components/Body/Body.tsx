import { useEffect } from 'react';
import { Grid } from '@chakra-ui/react';

import { Key } from './Key';
import { defaultTheme, theme } from '../../assets/theme';
import { DEFAULT_DISPLAY_VALUE, calculatorKeys } from '../../constants';

type CalculatorKey = keyof typeof calculatorKeys;

type UpdateCurrentNumber = (perviousValue: string) => string;

interface BodyProps {
  displayValue: Display;
  setDisplayValue: React.Dispatch<React.SetStateAction<Display>>;
}

export const Body = ({ displayValue, setDisplayValue }: BodyProps) => {
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
  }, [displayValue, displayValue.operator]);

  const UpdateActiveNumber = (updateCurrentNumber: UpdateCurrentNumber) => {
    if (displayValue.operator)
      return setDisplayValue({
        ...displayValue,
        secondNumber: updateCurrentNumber(displayValue.secondNumber.toString())
      });

    return setDisplayValue({ ...displayValue, firstNumber: updateCurrentNumber(displayValue.firstNumber.toString()) });
  };

  const handleReset = () => {
    setDisplayValue(DEFAULT_DISPLAY_VALUE);
  };

  const handleDelete = () =>
    setDisplayValue(previousValue => {
      if (previousValue.secondNumber)
        return { ...previousValue, secondNumber: previousValue.secondNumber.toString().slice(0, -1) };
      if (previousValue.operator) return { ...previousValue, operator: null };

      return { ...previousValue, firstNumber: previousValue.firstNumber.toString().slice(0, -1) };
    });

  const handleNumberInput = (num: string) =>
    setDisplayValue(displayedValue => {
      if (!displayedValue.operator) return { ...displayedValue, firstNumber: displayedValue.firstNumber + num };
      return { ...displayedValue, secondNumber: displayedValue.secondNumber + num };
    });

  const handlePeriodInput = () => {
    if (!displayValue.firstNumber || (displayValue.operator && !displayValue.secondNumber))
      return UpdateActiveNumber(number => number + '0.');

    if (displayValue.firstNumber.includes('.') || displayValue.secondNumber.includes('.')) return;

    UpdateActiveNumber(number => number + '.');
  };

  const handleOperatorInput = (newOperator: Operator) => {
    if (displayValue.firstNumber && displayValue.operator && displayValue.secondNumber) {
      setDisplayValue(previousValue => ({
        ...DEFAULT_DISPLAY_VALUE,
        firstNumber: calculate(previousValue).toString(),
        operator: newOperator
      }));
      return;
    }

    setDisplayValue({ ...displayValue, operator: newOperator });

    if (displayValue.operator && !displayValue.secondNumber)
      return setDisplayValue({ ...displayValue, operator: newOperator });

    const endsInPeriod = displayValue.firstNumber.slice(-1) === '.' || displayValue.secondNumber.slice(-1) === '.';
    if (endsInPeriod) {
      UpdateActiveNumber(number => number.slice(0, -1));
      return;
    }

    setDisplayValue({ ...displayValue, operator: newOperator });
  };

  const handleEqualInput = () => {
    if (!displayValue.operator || !displayValue.secondNumber) return;

    setDisplayValue({ ...DEFAULT_DISPLAY_VALUE, firstNumber: calculate(displayValue).toString(), operator: null });
  };

  const onKeyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.id === 'keyboard') return;

    // TODO: Refactor this
    if (+displayValue.firstNumber === Infinity || isNaN(+displayValue.firstNumber)) {
      setDisplayValue(DEFAULT_DISPLAY_VALUE);
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

const calculate = (calculation: Display) => {
  const { firstNumber, operator, secondNumber } = calculation;

  switch (operator) {
    case '+':
      return +firstNumber + +secondNumber;

    case '-':
      return +firstNumber - +secondNumber;

    case '*':
      return +firstNumber * +secondNumber;

    case '/':
      if (+firstNumber === 0 && +secondNumber === 0) return Infinity;

      return +firstNumber / +secondNumber;

    default:
      return NaN;
  }
};

import { useEffect, useState } from 'react';
import { Box, Button, GridItem, Grid } from '@chakra-ui/react';

import { calculate } from '../../assets/helperFunctions';
import { Key } from './Key';

const KEY_STROKES = {
  operators: ['+', '-', '*', '/'],
  numbers: Array.from({ length: 10 }, (_, i) => i.toString()).reverse(),
  period: '.',
  equal: '=',
  del: 'del',
  reset: 'reset'
};

export const Body = ({ currentDisplayValue, setCurrentDisplayValue }) => {
  const [currentValue, setCurrentValue] = useState(currentDisplayValue);
  const [operator, setOperator] = useState('');

  useEffect(() => {
    setCurrentDisplayValue(currentValue);
  }, [currentValue]);

  const handleChange = ({ target }) => {
    if (target.id === 'keyboard') return;

    const {
      attributes: {
        datatype: { value: keyType },
        datavalue: { value: keyValue }
      }
    } = target;
    const lastDisplayDigit = currentValue[currentValue.length - 1];

    if (keyType === 'reset') {
      setCurrentValue('0');
      setOperator('');
    }

    if (['math error', 'invalid operator'].includes(currentValue.toLowerCase())) return;

    if (keyType === 'del') {
      setCurrentValue(currentValue.slice(0, -1));

      if (currentValue.length === 1) setCurrentValue('0');
      if (KEY_STROKES.operators.includes(lastDisplayDigit)) setOperator('');
    }

    if (keyType === 'number')
      currentValue === '0' ? setCurrentValue(keyValue) : setCurrentValue(currentValue + keyValue);

    if (keyType === 'period')
      currentValue.split(operator ? operator : ' ').forEach(side => {
        if (!side.includes(keyValue))
          typeof Number(currentValue.slice(0, -1)) !== 'number'
            ? setCurrentValue(currentValue + '0' + keyValue)
            : currentValue[0] === '0'
            ? setCurrentValue('0' + keyValue)
            : setCurrentValue(currentValue + keyValue);
      });

    if (keyType === 'operator') {
      if (operator && currentValue.split(operator)?.[1].length > 0) {
        setCurrentValue(calculate(currentValue, operator).toString() + keyValue);
        return setOperator(keyValue);
      }

      setOperator(keyValue);
      if (KEY_STROKES.operators.includes(lastDisplayDigit) || lastDisplayDigit === '.')
        return setCurrentValue(currentValue.slice(0, -1) + keyValue);

      setCurrentValue(currentValue + keyValue);
    }

    if (keyType === 'equal') {
      if (!operator) return;

      setCurrentValue(calculate(currentValue, operator).toString());
      setOperator('');
    }
  };

  return (
    <Grid
      id="keyboard"
      p="30px"
      gridTemplate={`"num-7 num-8 num-9 del" 
                     "num-4 num-5 num-6 plus" 
                     "num-1 num-2 num-3 minus" 
                     "period num-0 division multiply"
                     "reset reset equal equal"`}
      gridTemplateColumns="repeat(4, 1fr)"
      gridTemplateRows="repeat(5, 1fr)"
      gap={['10px', null, '25px']}
      rounded="0.625rem"
      bg="hsl(223, 31%, 20%);"
      onClick={handleChange}
    >
      {KEY_STROKES.numbers.map(item => (
        <GridItem as={Key} area={`num-${item}`} key={item} datatype="number" datavalue={item}>
          {item}
        </GridItem>
      ))}

      {KEY_STROKES.operators.map((item, index) => (
        <GridItem
          as={Key}
          area={['plus', 'minus', 'multiply', 'division'][index]}
          key={item}
          datatype="operator"
          datavalue={item}
        >
          {item}
        </GridItem>
      ))}

      <GridItem as={Key} area="period" datatype="period" datavalue={KEY_STROKES.period}>
        {KEY_STROKES.period}
      </GridItem>

      <GridItem
        as={Key}
        area="del"
        bg="hsl(225, 21%, 49%)"
        borderColor="hsl(224, 28%, 35%)"
        fontSize={['xs', null, 'xl']}
        color="white"
        datatype="del"
        datavalue={KEY_STROKES.del}
      >
        {KEY_STROKES.del}
      </GridItem>

      <GridItem
        as={Key}
        area="reset"
        bg="hsl(225, 21%, 49%)"
        borderColor="hsl(224, 28%, 35%)"
        fontSize={['xs', null, 'xl']}
        color="white"
        datatype="reset"
        datavalue={KEY_STROKES.reset}
      >
        {KEY_STROKES.reset}
      </GridItem>

      <GridItem
        as={Key}
        area="equal"
        bg="hsl(6, 63%, 50%)"
        borderColor="hsl(6, 70%, 34%)"
        fontSize={['xs', null, 'xl']}
        color="white"
        datatype="equal"
        datavalue={KEY_STROKES.equal}
      >
        {KEY_STROKES.equal}
      </GridItem>
    </Grid>
  );
};

import { useEffect, useState } from 'react';
import { calculate } from '../../assets/helperFunctions';

const KEY_STROKES = {
  operators: ['+', '-', '*', '/'],
  numbers: Array.from({ length: 10 }, (_, i) => i.toString()),
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
    <div id="keyboard" onClick={handleChange}>
      {KEY_STROKES.numbers.map(item => (
        <button className="key" datatype="number" datavalue={item} key={item}>
          {item}
        </button>
      ))}

      {KEY_STROKES.operators.map(item => (
        <button className="key" datatype="operator" datavalue={item} key={item}>
          {item}
        </button>
      ))}

      <button className="key" datatype="period" datavalue={KEY_STROKES.period}>
        {KEY_STROKES.period}
      </button>

      <button className="key" datatype="del" datavalue={KEY_STROKES.del}>
        {KEY_STROKES.del}
      </button>

      <button className="key" datatype="reset" datavalue={KEY_STROKES.reset}>
        {KEY_STROKES.reset}
      </button>

      <button className="key" datatype="equal" datavalue={KEY_STROKES.equal}>
        {KEY_STROKES.equal}
      </button>
    </div>
  );
};

export const calculate = (equation, operator) => {
  let [firstNumber, secondNumber] = equation.split(operator).filter(item => item !== '');

  if (equation[0] === operator) firstNumber = operator + firstNumber;

  (firstNumber = Number(firstNumber)), (secondNumber = Number(secondNumber));

  console.log(firstNumber, operator, secondNumber);

  let result = 0;

  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;

    case '-':
      result = firstNumber - secondNumber;
      break;

    case '*':
      result = firstNumber * secondNumber;
      break;

    case '/':
      if (secondNumber === 0) return 'Math Error';
      result = firstNumber / secondNumber;
      break;

    default:
      return 'Invalid operator';
  }

  return result;
};

const core = require('@actions/core');

try {
  const multiLineVars = core.getMultilineInput('variables', { required: true });
  const varsLength = multiLineVars.length;

  if (varsLength > 10) core.setFailed(`Maximum number of variables allowed is 10. You're trying to set ${varsLength} variables`);

  const allowedDataTypes = ['string', 'boolean', 'number'];

  const validateDataType = (item) => {
    const type = eval('typeof ' + item);

    if (!allowedDataTypes.includes(type)) {
      console.log(`${item} dataType is not allowed`);
      return core.setFailed(`only <${allowedDataTypes.join(', ')}> dataTypes are allowed`);
    };
  }

  const variables = {};

  for (let i = 0; i < varsLength; i++) {
    if (multiLineVars[i].indexOf(':') === -1) core.setFailed(`Variable at position ${i+1} should be a key-value pair`);

    const splitVariable = multiLineVars[i].split(':');
    const key = splitVariable[0];
    const valueString = multiLineVars[i].replace(`${key}:`, '').trim();
    const splitValue = valueString.split(' ? ');

    if (splitValue.length > 1) {
      const operator = splitValue[0].match(/<[=>]?|==|>=?|!=|\&\&|\|\|/g)[0];
      const splitCondition = splitValue[0].split(operator).map(v => v.trim());
      const splitResult = splitValue[1].split(' : ').map(v => v.trim());
      const data = splitCondition.concat(splitResult);
      const dataLength = data.length;

      for (let j = 0; j < dataLength; j++) {
        validateDataType(data[j]);
      }

      variables[key] = eval(valueString);
    } else {
      validateDataType(splitValue[0]);
      variables[key] = eval(splitValue[0]);
    }
  }

  for (let i in variables) {
    core.exportVariable(i, variables[i]);
  }
} catch ({message}) {
  core.setFailed(message);
}

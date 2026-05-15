
export const Debug = {
  enabledPrinting: true,
  strictDebugMode: true,
  log: function(message) {
    if (this.enabledPrinting) {
      console.log(message);
    }
  },
  info: function(message) {
    if (this.enabledPrinting) {
      console.info(message);
    }
  },
  warn: function(message) {
    if (this.enabledPrinting) {
      console.warn(message);
    }
  },
  error: function(message) {
    if (this.strictDebugMode) {
      throw new Error(message);
    } else if (this.enabledPrinting) {
      console.error(message);
    }
  }
}

/**
 * 
 * @param {number} num 
 * @param {number} den 
 * @returns {number} A number in the range [0, den) if den is positive, or a number in the range (den, 0] if den is negative, or 0 otherwise.
 */
function mod(num, den) {
  num = +num || 0;
  den = +den || 0;
  if (den === 0) {
    return 0;
  }
  return ((num % den) + den) % den;
}

function formatSi(numericValue, precision=2, unitSymbol='') {
  const prefixSymbols = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  const prefixOffset = 8;
  const [normalizedValue, orderOfMagnitude] = numericValue.toExponential(precision - 1).split('e').map((x) => +x);
  const normalPrefixIndex = Math.floor(orderOfMagnitude / 3); // where 0 means the number is between 0 and 1000
  const correctiveExponentialChange = mod(orderOfMagnitude, 3);
  const displayedValue = normalizedValue * Math.pow(10, correctiveExponentialChange);
  return `${displayedValue} ${prefixSymbols[normalPrefixIndex + prefixOffset]}${unitSymbol}`;
}

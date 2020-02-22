import assertString from './util/assertString';


const hslcomma = /^(hsl)a?\(\s*((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?(deg|grad|rad|turn)?)\s*,\s*((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?)%\s*,\s*((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?)%\s*(,\s*(((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?)%?)\s*)?\)$/i;
const hslspace = /^(hsl)a?\(\s*((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?(deg|grad|rad|turn)?)\s*((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?)%\s*((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?)%\s*\/\s*((((\+|\-)?0*[0-9]+(\.[0-9]+)?(e(\+|\-)?0*[0-9]+)?)%?)\s*)?\)$/i;

export default function isHSL(str) {
  assertString(str);
  return hslcomma.test(str) || hslspace.test(str);
}

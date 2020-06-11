import merge from './util/merge';
import assertString from './util/assertString';

const upperCaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const numberRegex = /^[0-9]$/;
const symbolRegex = /^[-#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;

const defaultRequirementOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const defaultScoringOptions = {
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
  strengthThreshold: 50,
};

/* Counts number of occurances of each char in a string
 * could be moved to util/ ?
*/
function countChars(str) {
  let result = {};
  Array.from(str).forEach((char) => {
    let curVal = result[char];
    if (curVal) {
      result[char] += 1;
    } else {
      result[char] = 1;
    }
  });
  return result;
}

/* Return information about a password */
function analyzePassword(password) {
  let charMap = countChars(password);
  let analysis = {
    length: password.length,
    uniqueChars: Object.keys(charMap).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0,
  };
  Object.keys(charMap).forEach((char) => {
    if (upperCaseRegex.test(char)) {
      analysis.uppercaseCount += charMap[char];
    } else if (lowerCaseRegex.test(char)) {
      analysis.lowercaseCount += charMap[char];
    } else if (numberRegex.test(char)) {
      analysis.numberCount += charMap[char];
    } else if (symbolRegex.test(char)) {
      analysis.symbolCount += charMap[char];
    }
  });
  return analysis;
}

function scorePassword(analysis, scoringOptions) {
  let points = 0;
  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;
  if (analysis.lowercaseCount > 0) {
    points += scoringOptions.pointsForContainingLower;
  }
  if (analysis.uppercaseCount > 0) {
    points += scoringOptions.pointsForContainingUpper;
  }
  if (analysis.numberCount > 0) {
    points += scoringOptions.pointsForContainingNumber;
  }
  if (analysis.symbolCount > 0) {
    points += scoringOptions.pointsForContainingSymbol;
  }
  return points;
}

export default function isStrongPassword(password, requirementOptions = {}, scoringOptions = null) {
  assertString(password);
  const analysis = analyzePassword(password);
  if (scoringOptions) {
    scoringOptions = merge(scoringOptions, defaultScoringOptions);
    const score = scorePassword(analysis, defaultScoringOptions);
    return scoringOptions.returnScore ? score : score >= scoringOptions.strengthThreshold;
  }
  requirementOptions = merge(requirementOptions, defaultRequirementOptions);
  return analysis.length >= requirementOptions.minLength &&
        analysis.lowercaseCount >= requirementOptions.minLowercase &&
        analysis.uppercaseCount >= requirementOptions.minUppercase &&
        analysis.numberCount >= requirementOptions.minNumbers &&
        analysis.symbolCount >= requirementOptions.minSymbols;
}

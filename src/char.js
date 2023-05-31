import { intRange } from './int-range.js'
import { defaultEngine, generateCurry } from './utils.js'

/**
 * Returns a random character from the provided array
 * @param str String
 * @param engine PRNG of choice
 */
const char = (str, engine = defaultEngine) => {
  return str[intRange(0, str.length - 1, engine)]
}

const charWithEngine = generateCurry(char)

export {
  char,
  charWithEngine
}

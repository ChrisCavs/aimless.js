import { intRange } from './int-range'
import { generateCurry } from './utils'

/**
 * Returns a random character from the provided array
 * @param str String
 * @param engine PRNG of choice
 */
const char = (str, engine = Math.random) => {
  return str[intRange(0, str.length - 1, engine)]
}

const charWithEngine = generateCurry(char)

export {
  char,
  charWithEngine
}

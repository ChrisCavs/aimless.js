import { intRange } from './int-range.js'
import { defaultEngine } from './utils.js'

/**
 * Returns a random character from the provided array
 * @param {string} str
 * @param {() => number} engine PRNG of choice
 * @returns {string}
 */
const char = (str, engine = defaultEngine) => {
  return str[intRange(0, str.length - 1, engine)]
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(str: string) => string}
 */
const charWithEngine = (engine = defaultEngine) => {
  return (str) => char(str, engine)
}

export {
  char,
  charWithEngine
}

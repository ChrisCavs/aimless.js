import { defaultEngine, generateCurry, randIntRange } from './utils.js'

/**
 * Returns a random number within the integer range
 * @param {number} min Minimum integer
 * @param {number} max Maximum integer
 * @param {() => number} engine PRNG of choice
 */
const intRange = (min, max, engine = defaultEngine) => {
  return randIntRange(min, max, engine)
}

const intRangeWithEngine = generateCurry(intRange)

export {
  intRange,
  intRangeWithEngine
}

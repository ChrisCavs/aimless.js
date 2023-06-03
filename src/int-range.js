import { defaultEngine, randIntRange } from './utils.js'

/**
 * Returns a random number within the integer range
 * @param {number} min Minimum integer
 * @param {number} max Maximum integer
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
const intRange = (min, max, engine = defaultEngine) => {
  return randIntRange(min, max, engine)
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {(min: number, max: number) => number}
 */
const intRangeWithEngine = (engine = defaultEngine) => {
  return (min, max) => intRange(min, max, engine)
}

export {
  intRange,
  intRangeWithEngine
}

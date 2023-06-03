import { intRange } from './int-range.js'
import { defaultEngine } from './utils.js'

/**
 * Returns a random boolean (true or false)
 * @param {() => number} engine PRNG of choice
 * @returns {boolean}
 */
const bool = (engine = defaultEngine) => {
  return !!intRange(0, 1, engine)
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {() => boolean}
 */
const boolWithEngine = (engine = defaultEngine) => {
  return () => bool(engine)
}

export {
  bool,
  boolWithEngine
}

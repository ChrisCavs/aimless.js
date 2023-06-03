import { floatRange } from './float-range.js'
import { defaultEngine } from './utils.js'

/**
 * Returns a random number between -1 and 1
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
const normalFloat = (engine = defaultEngine) => {
  return floatRange(-1, 1, engine)
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {() => number}
 */
const normalFloatWithEngine = (engine = defaultEngine) => {
  return () => normalFloat(engine)
}

export {
  normalFloat,
  normalFloatWithEngine
}

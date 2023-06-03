import { bool } from './bool.js'
import { defaultEngine } from './utils.js'

/**
 * Returns a random sign (-1 or 1)
 * @param {() => number} engine PRNG of choice
 * @returns {number}
 */
const sign = (engine = defaultEngine) => {
  return bool(engine) ? 1 : -1
}

/**
 * @param {() => number} engine PRNG of choice
 * @returns {() => number}
 */
const signWithEngine = (engine = defaultEngine) => {
  return () => sign(engine)
}

export {
  sign,
  signWithEngine
}

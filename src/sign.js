import { bool } from './bool.js'
import { defaultEngine, generateCurry } from './utils.js'

/**
 * Returns a random sign (-1 or 1)
 * @param engine PRNG of choice
 */
const sign = (engine = defaultEngine) => {
  return bool(engine) ? 1 : -1
}

const signWithEngine = generateCurry(sign)

export {
  sign,
  signWithEngine
}

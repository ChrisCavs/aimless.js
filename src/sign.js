import { bool } from './bool'
import { defaultEngine, generateCurry } from './utils'

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

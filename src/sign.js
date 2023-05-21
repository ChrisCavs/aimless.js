import { bool } from './bool'
import { generateCurry } from './utils'

/**
 * Returns a random sign (-1 or 1)
 * @param engine PRNG of choice
 */
const sign = (engine = Math.random) => {
  return bool(engine) ? 1 : -1
}

const signWithEngine = generateCurry(sign)

export {
  sign,
  signWithEngine
}

import { intRange } from './int-range'
import { generateCurry } from './utils'

/**
 * Returns a random boolean (true or false)
 * @param engine PRNG of choice
 */
const bool = (engine = Math.random) => {
  return !!intRange(0, 1, engine)
}

const boolWithEngine = generateCurry(bool)

export {
  bool,
  boolWithEngine
}

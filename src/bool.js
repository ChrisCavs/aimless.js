import { intRange } from './int-range'
import { defaultEngine, generateCurry } from './utils'

/**
 * Returns a random boolean (true or false)
 * @param engine PRNG of choice
 */
const bool = (engine = defaultEngine) => {
  return !!intRange(0, 1, engine)
}

const boolWithEngine = generateCurry(bool)

export {
  bool,
  boolWithEngine
}

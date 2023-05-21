import { floatRange } from './float-range'
import { generateCurry } from './utils'

/**
 * Returns a random number between -1 and 1
 * @param engine PRNG of choice
 */
const normalFloat = (engine = Math.random) => {
  return floatRange(-1, 1, engine)
}

const normalFloatWithEngine = generateCurry(normalFloat)

export {
  normalFloat,
  normalFloatWithEngine
}

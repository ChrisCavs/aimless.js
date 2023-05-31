import { floatRange } from './float-range.js'
import { defaultEngine, generateCurry } from './utils.js'

/**
 * Returns a random number between -1 and 1
 * @param engine PRNG of choice
 */
const normalFloat = (engine = defaultEngine) => {
  return floatRange(-1, 1, engine)
}

const normalFloatWithEngine = generateCurry(normalFloat)

export {
  normalFloat,
  normalFloatWithEngine
}

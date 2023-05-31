import { defaultEngine, generateCurry } from "./utils.js"

/**
 * Returns a random number within the float range
 * @param min Minimum value
 * @param max Maximum value
 * @param engine PRNG of choice
 */
const floatRange = (min, max, engine = defaultEngine) => {
  return engine() * (max - min) + min
}

const floatRangeWithEngine = generateCurry(floatRange)

export {
  floatRange,
  floatRangeWithEngine
}
